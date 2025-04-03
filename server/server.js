require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});