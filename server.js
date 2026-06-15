const express = require('express');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Token encryption configuration
const TOKEN_SECRET = 'clinical_handover_and_ksnk_secret_key_8844';

// Helper to encrypt a user session token
function generateToken(user) {
  try {
    const payload = JSON.stringify({
      username: user.username,
      role: user.role,
      fullname: user.fullname,
      expires: Date.now() + 24 * 60 * 60 * 1000 // 24 Hours validity
    });
    // Use sha256 to hash the key to exactly 32 bytes for aes-256
    const key = crypto.createHash('sha256').update(TOKEN_SECRET).digest();
    const iv = Buffer.alloc(16, 0); // Static IV for simplicity
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let token = cipher.update(payload, 'utf8', 'hex');
    token += cipher.final('hex');
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
}

// Helper to decrypt and verify a user session token
function verifyToken(token) {
  if (!token) return null;
  try {
    const key = crypto.createHash('sha256').update(TOKEN_SECRET).digest();
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    const payload = JSON.parse(decrypted);
    if (payload.expires < Date.now()) {
      return null; // Expired
    }
    return payload;
  } catch (error) {
    return null; // Invalid token
  }
}

// Middleware: Authenticate requests
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Authorization header required' });
  
  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return res.status(403).json({ error: 'Invalid or expired token' });
  
  req.user = user;
  next();
}

// Middleware: Admin check
function requireAdmin(req, res, next) {
  authenticate(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }
    next();
  });
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// ---------------- AUTHENTICATION API ----------------

// Login API
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const passwordHash = db.hashPassword(password);
    const result = await db.query(
      'SELECT username, fullname, role FROM users WHERE username = $1 AND password_hash = $2',
      [username.trim().toLowerCase(), passwordHash]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không chính xác' });
    }

    const user = result.rows[0];
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        username: user.username,
        fullname: user.fullname,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register new staff account (Admin only)
app.post('/api/auth/register', requireAdmin, async (req, res) => {
  const { username, password, fullname, role } = req.body;

  if (!username || !password || !fullname || !role) {
    return res.status(400).json({ error: 'All fields (username, password, fullname, role) are required' });
  }

  try {
    // Check if username already exists
    const checkUser = await db.query('SELECT username FROM users WHERE username = $1', [username.trim().toLowerCase()]);
    if (checkUser.rows.length > 0) {
      return res.status(409).json({ error: 'Tên đăng nhập này đã tồn tại' });
    }

    const passwordHash = db.hashPassword(password);
    await db.query(
      'INSERT INTO users (username, password_hash, fullname, role) VALUES ($1, $2, $3, $4)',
      [username.trim().toLowerCase(), passwordHash, fullname.trim(), role]
    );

    res.json({ message: 'Tạo tài khoản nhân viên thành công' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get users list (Admin only)
app.get('/api/auth/users', requireAdmin, async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, fullname, role FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ---------------- CLINICAL CHECKLIST API ----------------

// Get all checklist progress
app.get('/api/checklists', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM checklist_progress');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching checklist progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a checklist item progress
app.post('/api/checklists/item', async (req, res) => {
  const { checklistId, itemId, checked, performer, completedAt } = req.body;
  
  if (!checklistId || !itemId) {
    return res.status(400).json({ error: 'checklistId and itemId are required' });
  }

  try {
    const queryText = `
      INSERT INTO checklist_progress (checklist_id, item_id, checked, completed_at, performer)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (checklist_id, item_id)
      DO UPDATE SET 
        checked = EXCLUDED.checked, 
        completed_at = EXCLUDED.completed_at, 
        performer = EXCLUDED.performer
      RETURNING *
    `;
    const values = [checklistId, itemId, checked, completedAt ? new Date(completedAt) : null, performer || null];
    const result = await db.query(queryText, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating checklist item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset a checklist (uncheck all items in the checklist)
app.post('/api/checklists/reset', async (req, res) => {
  const { checklistId } = req.body;
  
  if (!checklistId) {
    return res.status(400).json({ error: 'checklistId is required' });
  }

  try {
    await db.query('DELETE FROM checklist_progress WHERE checklist_id = $1', [checklistId]);
    res.json({ message: `Checklist ${checklistId} reset successfully` });
  } catch (error) {
    console.error('Error resetting checklist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get the last performer's name
app.get('/api/checklists/last-performer', async (req, res) => {
  try {
    // Check both clinical and ksnk performer fields to get the most recent active name
    const result = await db.query(`
      SELECT performer FROM (
        SELECT performer, completed_at FROM checklist_progress WHERE performer IS NOT NULL AND performer != ''
        UNION ALL
        SELECT performer, completed_at FROM ksnk_progress WHERE performer IS NOT NULL AND performer != ''
      ) combined
      ORDER BY completed_at DESC 
      LIMIT 1
    `);
    
    if (result.rows.length > 0) {
      res.json({ performer: result.rows[0].performer });
    } else {
      res.json({ performer: null });
    }
  } catch (error) {
    console.error('Error fetching last performer:', error);
    res.status(500).json({ performer: null });
  }
});


// ---------------- INFECTION CONTROL (KSNK) API ----------------

// Get all KSNK checklist progress
app.get('/api/ksnk', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ksnk_progress');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching KSNK checklist progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a KSNK checklist item progress
app.post('/api/ksnk/item', async (req, res) => {
  const { checklistId, itemId, checked, performer, completedAt } = req.body;
  
  if (!checklistId || !itemId) {
    return res.status(400).json({ error: 'checklistId and itemId are required' });
  }

  try {
    const queryText = `
      INSERT INTO ksnk_progress (checklist_id, item_id, checked, completed_at, performer)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (checklist_id, item_id)
      DO UPDATE SET 
        checked = EXCLUDED.checked, 
        completed_at = EXCLUDED.completed_at, 
        performer = EXCLUDED.performer
      RETURNING *
    `;
    const values = [checklistId, itemId, checked, completedAt ? new Date(completedAt) : null, performer || null];
    const result = await db.query(queryText, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating KSNK item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset a KSNK checklist
app.post('/api/ksnk/reset', async (req, res) => {
  const { checklistId } = req.body;
  
  if (!checklistId) {
    return res.status(400).json({ error: 'checklistId is required' });
  }

  try {
    await db.query('DELETE FROM ksnk_progress WHERE checklist_id = $1', [checklistId]);
    res.json({ message: `KSNK checklist ${checklistId} reset successfully` });
  } catch (error) {
    console.error('Error resetting KSNK checklist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ---------------- RISK CALCULATOR API ----------------

// Get calculation history
app.get('/api/history', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM calculation_history ORDER BY calculated_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching calculation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save calculation history
app.post('/api/history', async (req, res) => {
  const { scoreType, score, parameters, resultSummary } = req.body;
  
  if (!scoreType || score === undefined || !parameters || !resultSummary) {
    return res.status(400).json({ error: 'scoreType, score, parameters, and resultSummary are required' });
  }

  try {
    const queryText = `
      INSERT INTO calculation_history (score_type, score, parameters, result_summary, calculated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const values = [scoreType, score, JSON.stringify(parameters), resultSummary];
    const result = await db.query(queryText, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving calculation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ---------------- ADMIN DASHBOARD STATISTICS API ----------------

// Get aggregated stats for the admin panel (Admin only)
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    // 1. Total users
    const usersRes = await db.query('SELECT COUNT(*) FROM users');
    const totalUsers = parseInt(usersRes.rows[0].count);

    // 2. Total clinical checked items
    const clinicalCheckedRes = await db.query('SELECT COUNT(*) FROM checklist_progress WHERE checked = true');
    const clinicalChecks = parseInt(clinicalCheckedRes.rows[0].count);

    // 3. Total KSNK checked items
    const ksnkCheckedRes = await db.query('SELECT COUNT(*) FROM ksnk_progress WHERE checked = true');
    const ksnkChecks = parseInt(ksnkCheckedRes.rows[0].count);

    // 4. Total risk calculations count
    const historyRes = await db.query('SELECT COUNT(*) FROM calculation_history');
    const totalCalculations = parseInt(historyRes.rows[0].count);

    // 5. Grouped calculators counts for round chart
    const calculatorsDistributionRes = await db.query(`
      SELECT score_type as type, COUNT(*) as count 
      FROM calculation_history 
      GROUP BY score_type
    `);

    // 6. Checked count per checklist in KSNK for performance bar chart
    const ksnkDetailsRes = await db.query(`
      SELECT checklist_id as id, COUNT(*) as count 
      FROM ksnk_progress 
      WHERE checked = true 
      GROUP BY checklist_id
    `);

    // 7. Combined audit log timeline
    const logsRes = await db.query(`
      SELECT checklist_id, item_id, completed_at, performer, 'clinical' as type FROM checklist_progress WHERE checked = true
      UNION ALL
      SELECT checklist_id, item_id, completed_at, performer, 'ksnk' as type FROM ksnk_progress WHERE checked = true
      UNION ALL
      SELECT score_type as checklist_id, '' as item_id, calculated_at as completed_at, 'Kíp lâm nghiệp' as performer, 'calc' as type FROM calculation_history
      ORDER BY completed_at DESC 
      LIMIT 15
    `);

    res.json({
      summary: {
        totalUsers,
        clinicalChecks,
        ksnkChecks,
        totalCalculations
      },
      calculatorsDistribution: calculatorsDistributionRes.rows,
      ksnkDistribution: ksnkDetailsRes.rows,
      auditLog: logsRes.rows
    });
  } catch (error) {
    console.error('Error fetching admin dashboard statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start server
async function start() {
  try {
    await db.initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  Clinical Management Server started on port ${PORT}`);
      console.log(`  Access URL: http://localhost:${PORT}`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
