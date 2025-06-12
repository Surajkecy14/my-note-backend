// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../module/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../middleware/isLoggedIn');
// Example routes
router.post('/createAccount', async(req, res) => {
  const {name,email,password}= req.body;
  const sPassword =  await bcrypt.hash(password,10)
  const user = await User.findOne({email});
  if(user){
    res.json("user already exsit")
  }
   else{
  User.create({
    name,
    email,
    password:sPassword
  })
  res.json("account created")
} 
});

router.post('/loginAccount', async(req, res) => {
    const{email,password}= req.body;
    const user = await User.findOne({email})
    if(!user){
        res.json("password or email wronge..")
    }
    else{
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            res.json("password or email wronge..")
        }
        else{
           const token = jwt.sign(email, process.env.JWT_SECRET);
            res.cookie('token',token,{httpOnly:true})
            res.json("login sucessfull")
        }
    }
});

    router.get('/isLoggedIn',isLoggedIn,(req,res)=>{
      res.json("loggedIn")
    })

    router.get('/logout',(req,res)=>{
      res.clearCookie('token')
      res.status(200).json({ message: 'Logged out successfully' });
    })
    router.get('/userInfo',isLoggedIn,async(req,res)=>{
      const user = await User.findOne({email:req.user})
      res.json(user)
    })

module.exports = router; // <<--- VERY IMPORTANT