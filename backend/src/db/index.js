// src/db/index.js
require("dotenv").config();  // Load env variables if not already done
const { Pool } = require("pg");

// Create a new pool using environment variables
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Test the connection (optional, but useful for debugging)
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgreSQL", err);
  } else {
    console.log("Connected to PostgreSQL at:", res.rows[0].now);
  }
});

module.exports = pool;
