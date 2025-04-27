const { pool } = require('../config/db');

const submitApplication = async (data) => {
  const { name, email, hostel, preference } = data;
  const result = await pool.query(
    'INSERT INTO apply (name, email, hostel, preference) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hostel, preference]
  );
  return result.rows[0];
};
