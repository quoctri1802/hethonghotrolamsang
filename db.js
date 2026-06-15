const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("FATAL ERROR: DATABASE_URL environment variable is not defined in .env!");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Initialize database tables
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log("Database connection successful. Verifying tables...");
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'staff'
      );
    `);
    console.log("Table 'users' verified.");

    // Create checklist_progress table (Clinical Checklists)
    await client.query(`
      CREATE TABLE IF NOT EXISTS checklist_progress (
        checklist_id VARCHAR(50) NOT NULL,
        item_id VARCHAR(50) NOT NULL,
        checked BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP WITH TIME ZONE,
        performer VARCHAR(100),
        PRIMARY KEY (checklist_id, item_id)
      );
    `);
    console.log("Table 'checklist_progress' verified.");

    // Create ksnk_progress table (Infection Control Checklists)
    await client.query(`
      CREATE TABLE IF NOT EXISTS ksnk_progress (
        checklist_id VARCHAR(50) NOT NULL,
        item_id VARCHAR(50) NOT NULL,
        checked BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP WITH TIME ZONE,
        performer VARCHAR(100),
        PRIMARY KEY (checklist_id, item_id)
      );
    `);
    console.log("Table 'ksnk_progress' verified.");

    // Create calculation_history table (Clinical Calculations)
    await client.query(`
      CREATE TABLE IF NOT EXISTS calculation_history (
        id SERIAL PRIMARY KEY,
        calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        score_type VARCHAR(50) NOT NULL,
        score NUMERIC NOT NULL,
        parameters JSONB NOT NULL,
        result_summary TEXT NOT NULL
      );
    `);
    console.log("Table 'calculation_history' verified.");
    
    // Seed default users if table is empty
    const usersCount = await client.query("SELECT COUNT(*) FROM users");
    if (parseInt(usersCount.rows[0].count) === 0) {
      console.log("Users table is empty. Seeding default accounts...");
      
      const adminHash = hashPassword("admin123");
      const staffHash = hashPassword("nhanvien123");
      
      await client.query(`
        INSERT INTO users (username, password_hash, fullname, role) VALUES
        ('admin', $1, 'Quản trị viên Hệ thống', 'admin'),
        ('nhanvien', $2, 'Nhân viên Y tế - Staff', 'staff')
      `, [adminHash, staffHash]);
      
      console.log("Default users seeded successfully (admin/admin123, nhanvien/nhanvien123).");
    }
    
    console.log("Database initialization completed successfully.");
  } catch (error) {
    console.error("Error initializing database tables:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  initializeDatabase,
  query: (text, params) => pool.query(text, params),
  hashPassword
};
