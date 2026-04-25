const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
