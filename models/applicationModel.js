const { pool } = require('../config/db');
module.exports = (req, res, next) => {
    
    next();
};


const submitApplication = async (data) => {
  const { name, email, hostel, preference } = data;
  const result = await pool.query(
    'INSERT INTO applications (name, email, hostel, preference) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hostel, preference]
  );
  return result.rows[0];
};

const getAllApplications = async () => {
  const result = await pool.query('SELECT * FROM applications');
  return result.rows;
};

const updateStatus = async (id, status) => {
  await pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id]);
};

module.exports = { submitApplication, getAllApplications, updateStatus };
