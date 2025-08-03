const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/moodentry');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Add mood entry
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { mood, score, notes, activities } = req.body;
    const moodEntry = new MoodEntry({
      userId: req.user.id,
      mood,
      score,
      notes,
      activities
    });
    await moodEntry.save();
    res.json({ message: 'Mood entry added successfully', moodEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's mood history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const moodEntries = await MoodEntry.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(moodEntries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get mood statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalEntries = await MoodEntry.countDocuments({ userId: req.user.id });
    const avgScore = await MoodEntry.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, avgScore: { $avg: '$score' } } }
    ]);
    
    const weeklyMoods = await MoodEntry.find({
      userId: req.user.id,
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: 1 });

    res.json({
      totalEntries,
      averageScore: avgScore[0]?.avgScore || 0,
      weeklyMoods
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;