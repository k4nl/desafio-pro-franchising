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


const verifyIngredientName = (ingredient) => {
  if (ingredient) {
    throw new CustomError(e.invalidIngredientName)
  }
}

const dataFormat = (data) => {
  let newObject = {};
  for (let [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      newObject[key] = value.toLowerCase();
    } else {
      newObject[key] = value;
    }
  }

  newObject.stockPrice = Math.round((newObject.quantity * newObject.unitPrice), -2);

  return newObject;
}

const verifyIfIngredientIdExist = (ingredient) => {
  if (!ingredient) {
    throw new CustomError(e.ingredientNotFound);
  }
}

const verifyUser = (user) => {
  if (user.role !== 'admin') {
    throw new CustomError(e.unauthorized);
  }
}

module.exports = {
  verifyIfUserEmailExists,
  verifyJoiError,
  verifyUser,
  verifyPassword,
  verifyIngredientName,
  dataFormat,
  verifyIfIngredientIdExist,
}