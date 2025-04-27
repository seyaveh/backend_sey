const express = require('express');
const router = express.Router();
const { getAllApplications, updateStatus } = require('../models/applicationModel');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.get('/applications', authenticateAdmin, async (req, res) => {
  try {
    const apps = await getAllApplications();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.put('/applications/:id', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await updateStatus(req.params.id, status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;