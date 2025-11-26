const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = 'MY_SUPER_SECRET';

const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
  } catch (err) {
    return null;
  }
};

module.exports = { getUserFromToken };
