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

app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://emmrexblog.vercel.app'
  ],
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

// DB
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello developer');
});

app.listen(process.env.PORT || 4005, () => {
  console.log(`Server running on port ${process.env.PORT || 4005}`);
});
