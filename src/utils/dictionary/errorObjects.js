const s = require('./status');

const error = {
  emailAlreadyExist: { status: s.alreadyExists, message: 'Email already exists, please choose another email' },
  userNotFound: { status: s.notFound, message: 'User not found'},
  incorrectPassword: {status: s.unauthorized, message: 'Incorrect Password'},
  ingredientNotFound: { status: s.notFound, message: 'Ingredient not found'},
  wrongObjectIdFormat: { status: s.invalidRequest, message: 'Wrong ObjectId format'},
  wrongQuantityFormat: { status: s.invalidRequest, message: 'Wrong quantity format, the quantity should be bigger than 0'},
  wrongUnitPriceFormat: { status: s.invalidRequest, message: 'Wrong unit price format, the unit price should be bigger than 0'},
}

module.exports = error;