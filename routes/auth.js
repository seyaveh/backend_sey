// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const USERS = [
  { email: 'testuser@example.com', password: bcrypt.hashSync('password123', 10) }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
