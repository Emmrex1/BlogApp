// Load environment variables
require("dotenv").config(); 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// CORS configurat
const allowedOrigins = [
  'http://localhost:5173',
  'https://emmrexblog.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



// Routes
const blogRoutes = require('./src/routes/Blog.route'); 
const commentRoutes = require('./src/routes/Comment.route'); 
const userRoutes = require('./src/routes/auth.user.route');
const contactRoutes = require('./src/routes/Contact.route');
const adminRoutes = require('./src/routes/auth.admin.route');

app.use('/api/auth', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', contactRoutes);
app.use('/api/auth', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello developer');
});

// Database connection
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('Database connection error:', err));

// Start server
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
