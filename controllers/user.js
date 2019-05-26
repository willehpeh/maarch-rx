const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dbConfig = require('../config/db');

exports.signup = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: 'Missing information!' });
  }
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(() => {
      res.status(200).json({ message: 'User saved successfully!' });
    }).catch(error => {
      res.status(500).json({ error: error || 'Database error!' });
    });
  }).catch(error => {
    res.status(500).json({ error: error || 'Encryption error!' });
  });
};

exports.login = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    res.status(400).json({
      error: 'Missing information!'
    });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'Invalid email address or password!' });
    }
    bcrypt.compare(req.body.password, user.password).then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Invalid email address or password!' });
      }
      const userId = user._id;
      const token = jwt.sign({ userId }, dbConfig.jwtSecret, { expiresIn: '24h'});
      res.status(200).json({ userId, token });
    }).catch(error => {
      res.status(500).json({ error: error || 'Encryption error!' });
    });
  }).catch(error => {
    res.status(500).json({ error: error || 'Database error!' });
  });
};
