const CustomError = require('../../middlewares/CustomError');
const e = require('../dictionary/errorObjects');
const s = require('../dictionary/status');

const verifyJoiError = (error) => {
  const msg = error && error.details[0].message;
  if (error) {
    throw new CustomError({ status: s.invalidRequest, message: msg });
  }
}

const verifyIfUserEmailExists = (email) => {
  if (email) {
    throw new CustomError(e.emailAlreadyExist);
  };
};

module.exports = {
  verifyIfUserEmailExists,
  verifyJoiError
}