const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  console.log('login', req.body);
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username, password}).exec();

    if (user) {
      res.json({res: 'OK', jwt: {username}});
    } else {
      res.status(400).json({res: 'ERR'});
    }
  } catch (e) {
    res.status(400).json({res: 'ERR'});
  }
});

router.post('/signup', async (req, res) => {
  console.log('signup', req.body);
  try {
    const {username, email, password, name} = req.body;
    const newUser = new User({username, email, password, name});
    await newUser.save();

    res.json({res: 'OK'});
  } catch (e) {
    res.status(400).json({res: 'ERR'});
  }
});

module.exports = router;
