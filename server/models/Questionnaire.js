const mongoose = require('mongoose');
const QuestionnaireSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});