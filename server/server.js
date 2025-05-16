require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();


// General rate limiter (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// Connect Database
connectDB();
app.use(express.json());


// Middleware
app.use(cors({
  origin: "https://weather-forecasting-app-ivory.vercel.app/",  // replace with "*" to allow all origins during dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));


// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});