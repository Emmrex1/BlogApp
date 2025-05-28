require('dotenv').config(); 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));




const blogRoutes = require('./src/routes/Blog.route') 
const commentRoutes = require('./src/routes/Comment.route') 
const userRoutes = require('./src/routes/auth.user.route')


 app.use('/api/auth', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/comments',commentRoutes)


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Hello developer');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

