const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Function to test the database connection
const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()'); // Simple query to test connection
    console.log('✅ PostgreSQL connected');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1); // Stop the server if connection fails
  }
};

// Connect to the database
connectDB();

// Setup express server (if you are using it)
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
