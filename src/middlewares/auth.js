require('dotenv').config();
const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const e = require('../utils/dictionary/status');
const verify = require('../utils/functions/index');

const secret = process.env.SECRET || 'mecontrata';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
}

const ingredientRouteVerify = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(e.unauthorized);

  try {
    const decoded = jwt.verify(authorization, secret);
    verify.verifyUserAdmin(decoded.data);
    return next();
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const createToken = (id, email, role) => jwt.sign({ data: { id, email, role } }, secret, jwtConfig);

module.exports = {
  createToken,
  ingredientRouteVerify,
};