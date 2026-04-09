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

// CORS
const corsOptions = {
  origin: [/localhost:5173$/, /admin\.localhost:5173$/], 
  credentials: true,
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
setupSwagger(app);

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

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to Local MongoDB (scentStory)');
    app.listen(PORT, () => {
      console.log(`🚀 Server is flying at http://127.0.0.1:${PORT}`);
      console.log(`🌐 Admin Domain Detection: ACTIVE`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });