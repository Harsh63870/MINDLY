const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const questionnaireRoutes = require('./routes/Questionnaire');
app.use('/api/Questionnaire', questionnaireRoutes)
app.use(cors());
app.use(express.json());
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api/auth', authRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));