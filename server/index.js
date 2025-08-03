const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const questionnaireRoutes = require('./routes/Questionnaire');
const moodRoutes = require('./routes/mood');
const achievementRoutes = require('./routes/achievements');

const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindly', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  console.log('Please make sure MongoDB is running or use MongoDB Atlas');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/Questionnaire', questionnaireRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/achievements', achievementRoutes);

// Dashboard route
app.get('/api/dashboard', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const MoodEntry = require('./models/moodentry');
    const Achievement = require('./models/achievement');
    
    const moodData = await MoodEntry.find({ userId: decoded.id })
      .sort({ createdAt: -1 })
      .limit(5);
    
    const achievements = await Achievement.find({ userId: decoded.id })
      .sort({ unlockedAt: -1 })
      .limit(3);
    
    res.json({ moodData, achievements });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});