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

const verifyUser = (user) => {
  if (!user) {
    throw new CustomError(e.userNotFound)
  }
}

const verifyPassword = ({ user }, password) => {
  if (user.password !== password) {
    throw new CustomError(e.incorrectPassword)
  }
}

module.exports = {
  verifyIfUserEmailExists,
  verifyJoiError,
  verifyUser,
  verifyPassword,
}