const mongoose = require('mongoose');
const { User } = require('../models/userModel');
const { Blog } = require('../models/blogModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_KEY;

exports.getUserInfo = (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        isLoggedin: false,
        user: { isAdmin: false },
        message: 'TOKEN IS REQUIRED',
      });
    }

    jwt.verify(token, secret, (err, data) => {
      if (err) {
        return res.status(401).json({
          isLoggedin: false,
          user: { isAdmin: false },
          message: 'INVALID TOKEN',
        });
      }
      res.status(200).json({
        isLoggedin: true,
        user: data,
      });
    });
  } catch (err) {
    console.error('Get User Info Error:', err.message || err);
    res.status(500).json({ message: 'Failed to retrieve user info' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, username, password, enrollment } = req.body;

    if (!name || !username || !password || !enrollment) {
      return res.status(400).json({ message: 2, error: 'All fields are required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 4, error: 'Username already exists' });
    }

    const newUser = new User({
      isAdmin: false,
      name,
      username,
      password: md5(password),
      enrollment: enrollment.toUpperCase(),
    });

    await newUser.save();
    res.status(201).json({ message: 1, success: 'User successfully registered' });
  } catch (err) {
    console.error('Registration Error:', err.message || err);
    res.status(500).json({ message: 0, error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 2,
        isLoggedin: false,
        user: { isAdmin: false },
        error: 'Username and Password are required',
      });
    }

    const user = await User.findOne({
      username,
      password: md5(password),
    });

    if (!user) {
      return res.status(401).json({
        message: 0,
        isLoggedin: false,
        user: { isAdmin: false },
        error: 'Invalid credentials',
      });
    }

    const currentUser = {
      isAdmin: user.isAdmin,
      name: user.name,
      _id: user._id,
    };

    const token = jwt.sign(currentUser, secret, { expiresIn: '5h' });

    return res.status(200).json({
      message: 1,
      isLoggedin: true,
      user: currentUser,
      token,
    });
  } catch (err) {
    console.error('Login Error:', err.message || err);
    res.status(500).json({
      message: 3,
      isLoggedin: false,
      user: { isAdmin: false },
      error: 'Failed to login',
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { username, enrollment, password } = req.body;

    if (!username || !enrollment || !password) {
      return res.status(400).json({ message: 2, error: 'All fields are required' });
    }

    const result = await User.updateOne(
        { username, enrollment: enrollment.toUpperCase() },
        { password: md5(password) }
    );

    if (result.matchedCount === 1) {
      return res.status(200).json({ message: 4, success: 'Password successfully reset' });
    }

    return res.status(400).json({ message: 0, error: 'User not found or mismatch' });
  } catch (err) {
    console.error('Reset Password Error:', err.message || err);
    res.status(500).json({ message: 3, error: 'Failed to reset password' });
  }
};

exports.myblogs = async (req, res) => {
  try {
    const { userid } = req.query;

    if (!userid) {
      return res.status(400).json({ message: 2, error: 'User ID is required' });
    }

    const blogs = await Blog.find({ userId: userid });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: 0, error: 'No blogs found for this user' });
    }

    res.status(200).json({ data: blogs });
  } catch (err) {
    console.error('Fetch Blogs Error:', err.message || err);
    res.status(500).json({ message: 3, error: 'Failed to fetch user blogs' });
  }
};
