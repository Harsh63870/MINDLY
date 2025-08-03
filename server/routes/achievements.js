const express = require('express');
const router = express.Router();
const Achievement = require('../models/achievement');
const MoodEntry = require('../models/moodentry');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

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

// Get user achievements
router.get('/', authenticateToken, async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user.id })
      .sort({ unlockedAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Check and award achievements
router.post('/check', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user stats
    const totalMoodEntries = await MoodEntry.countDocuments({ userId });
    const consecutiveDays = await calculateConsecutiveDays(userId);
    
    const newAchievements = [];
    
    // First mood entry achievement
    if (totalMoodEntries === 1) {
      const exists = await Achievement.findOne({ 
        userId, 
        title: 'First Step' 
      });
      if (!exists) {
        const achievement = new Achievement({
          userId,
          title: 'First Step',
          description: 'Tracked your first mood entry',
          icon: '🌟',
          category: 'milestone'
        });
        await achievement.save();
        newAchievements.push(achievement);
      }
    }
    
    // 7 day streak achievement
    if (consecutiveDays >= 7) {
      const exists = await Achievement.findOne({ 
        userId, 
        title: 'Week Warrior' 
      });
      if (!exists) {
        const achievement = new Achievement({
          userId,
          title: 'Week Warrior',
          description: 'Tracked your mood for 7 consecutive days',
          icon: '🔥',
          category: 'streak'
        });
        await achievement.save();
        newAchievements.push(achievement);
      }
    }
    
    // 30 entries achievement
    if (totalMoodEntries >= 30) {
      const exists = await Achievement.findOne({ 
        userId, 
        title: 'Mood Master' 
      });
      if (!exists) {
        const achievement = new Achievement({
          userId,
          title: 'Mood Master',
          description: 'Tracked 30 mood entries',
          icon: '👑',
          category: 'milestone'
        });
        await achievement.save();
        newAchievements.push(achievement);
      }
    }
    
    res.json({ newAchievements });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

async function calculateConsecutiveDays(userId) {
  const entries = await MoodEntry.find({ userId })
    .sort({ createdAt: -1 })
    .limit(30);
  
  if (entries.length === 0) return 0;
  
  let consecutiveDays = 1;
  let currentDate = new Date(entries[0].createdAt);
  currentDate.setHours(0, 0, 0, 0);
  
  for (let i = 1; i < entries.length; i++) {
    const entryDate = new Date(entries[i].createdAt);
    entryDate.setHours(0, 0, 0, 0);
    
    const diffTime = currentDate - entryDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      consecutiveDays++;
      currentDate = entryDate;
    } else {
      break;
    }
  }
  
  return consecutiveDays;
}

module.exports = router;