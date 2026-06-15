const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("WARNING: DATABASE_URL environment variable is not defined! Database operations will fail until it is configured.");
}

const pool = connectionString ? new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
}) : null;

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Initialize database tables
async function initializeDatabase() {
  if (!pool) {
    throw new Error("DATABASE_URL is missing. Please configure it in your environment variables.");
  }

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

    // Create checklist_progress table
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

    // Create ksnk_progress table
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

    // Create calculation_history table
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
    
    // Seed default users if table is empty
    const usersCount = await client.query("SELECT COUNT(*) FROM users");
    if (parseInt(usersCount.rows[0].count) === 0) {
      const adminHash = hashPassword("admin123");
      const staffHash = hashPassword("nhanvien123");
      
      await client.query(`
        INSERT INTO users (username, password_hash, fullname, role) VALUES
        ('admin', $1, 'Quản trị viên Hệ thống', 'admin'),
        ('nhanvien', $2, 'Nhân viên Y tế - Staff', 'staff')
      `, [adminHash, staffHash]);
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
  query: (text, params) => {
    if (!pool) throw new Error("DATABASE_URL is not configured!");
    return pool.query(text, params);
  },
  hashPassword
};
