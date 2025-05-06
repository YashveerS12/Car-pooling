const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User=require("../Models/user.js");
const bcrypt = require("bcryptjs");
app.use(express.json());


module.exports.signup= async (req, res) => {
    const { name, number, email, age, gender, password } = req.body;
console.log(req.body);

    if (!name || !number || !email || !age || !gender || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = new User({
      name,
      number,
      email,
      age,
      gender,
      password 
    });
  
    try {
      const savedUser = await newUser.save();
      console.log("Successfully Saved");
      res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email

      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};