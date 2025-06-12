require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/auth')
const cors = require('cors')
const noteRoutes = require('./routes/note')
const app = express();
const PORT = 5000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//using cors
app.use(cors({
  origin: 'https://my-note-frontend-three.vercel.app/',
  credentials: true
}));
// Middleware to parse JSON
app.use(express.json());
//Connect mongo
mongoose.connect(process.env.MONGO_URI)
// Use auth routes — now accessible as /auth/login, /auth/logout, etc.
app.use('/auth', authRoutes);
// Use mote routes — now accessible as /note/edit, /auth/add, etc.
app.use('/note',noteRoutes)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
