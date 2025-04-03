const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createJWT } = require('../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Create token
    const token = user.createJWT();

    res.status(201).json({ 
      message: 'Signup Successful!',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;	