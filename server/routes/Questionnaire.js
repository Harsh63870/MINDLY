const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');
const User = require('../models/User');

router.post('/save', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    if (!userId || !answers) {
      return res.status(400).json({ message: 'Missing userId or answers' });
    }
    const questionnaire = new Questionnaire({ userId, answers });
    await questionnaire.save();
    res.json({ message: 'Answers saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
