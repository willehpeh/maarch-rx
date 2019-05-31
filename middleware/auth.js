const jwt = require('jsonwebtoken');
const dbConfig = require('../config/db');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, dbConfig.jwtSecret);
    req.body.userId = decodedToken.userId;
    next();
  } catch(error) {
    res.status(401).json({
      error: 'You are not authorised to create new posts!'
    });
  }
};
