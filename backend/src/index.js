require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const fragranceRoutes = require('./routes/fragrance.routes');
const combinationRoutes = require('./routes/combination.routes');
const userRoutes = require('./routes/user.routes');
const questionRoutes = require('./routes/question.routes');
const reportRoutes = require('./routes/report.routes'); 

const setupSwagger = require('./swagger');

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedPatterns = [
      /^http:\/\/localhost:5001$/,
      /^http:\/\/admin\.localhost:5001$/,
      /^http:\/\/127\.0\.0\.1:5001$/, 
      /^http:\/\/admin\.127\.0\.0\.1:5001$/, 
      /^http:\/\/localhost:5173$/,
      /^http:\/\/admin\.localhost:5173$/,
      /^http:\/\/127\.0\.0\.1:5173$/,
      /^http:\/\/admin\.127\.0\.0\.1:5173$/,
      /^https:\/\/scentstoryhost\.vercel\.app$/, // Allow production frontend
      /^https:\/\/.*\.vercel\.app$/ // Allow Vercel preview domains
    ];

    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('❌ CORS Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());

// Subdomain Detection Middleware
app.use((req, res, next) => {
  const host = req.headers.host || '';
  req.isAdminDomain = host.startsWith('admin.');
  next();
});

//swagger-docs
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  setupSwagger(app);
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/fragrances', fragranceRoutes);
app.use('/api/combinations', combinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reports', reportRoutes); 
app.get('/', (req, res) => {
  res.send('ScentStory API is running... 🌸');
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined in environment variables.');
}

// Connect to Database
mongoose
  .connect(MONGO_URI || '')
  .then(() => console.log('✅ Connected to MongoDB (scentStory)'))
  .catch((err) => console.error('❌ Database connection failed:', err.message));

// Only listen locally if we are not in a serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is flying at http://127.0.0.1:${PORT}`);
    console.log(`🌐 Admin Domain Detection: ACTIVE`);
  });
}

// Export for Vercel Serverless Functions
module.exports = app;