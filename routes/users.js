const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');

router.post('/login', async (req, res) => {
  try {
    let {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({res: 'ERR', msg: 'نام کاربری یا رمز ورود خالی می‌باشد'});
    }
    username = username.toLowerCase();
    const user = await User.findOne({username, password}).exec();

    if (user) {
      res.json({res: 'OK', jwt: {username}});
    } else {
      res.status(400).json({res: 'ERR', msg: 'نام کاربری یا رمز ورود اشتباه می‌باشد'});
    }
  } catch (e) {
    res.status(400).json({res: 'ERR', msg: 'خطای سیستمی رخ داده است'});
  }
});

router.post('/signup', [
  check('name').isString().isLength({min: 1}),
  check('phone').isNumeric().isLength(11),
  check('username').isAlphanumeric(),
  check('email').isEmail(),
  check('password').isString().isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let {username, email, password, name, phone} = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase();
    const newUser = new User({username, email, password, name, phone});
    await newUser.save();

    res.json({res: 'OK'});
  } catch (e) {
    res.status(400).json({res: 'ERR', msg: 'این نام کاربری یا ایمیل قبلا استفاده شده است'});
  }
});

module.exports = router;
