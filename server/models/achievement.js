const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  category: { type: String, enum: ['mood', 'streak', 'milestone', 'special'], default: 'mood' },
  unlockedAt: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
  target: { type: Number, default: 1 }
});

module.exports = mongoose.model('Achievement', AchievementSchema);