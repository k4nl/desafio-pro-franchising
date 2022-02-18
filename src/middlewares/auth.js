require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const e = require('../utils/dictionary/status');

const secret = process.env.SECRET || 'mecontrata';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
}

const createToken = (id, email, role) => jwt.sign({ data: { id, email, role } }, secret, jwtConfig);

module.exports = {
  createToken,
};