const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token; // read from cookies
  if (!token) {
    return res.json("not logged in user")
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
};

module.exports = isLoggedIn;
