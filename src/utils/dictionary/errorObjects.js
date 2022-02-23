const s = require('./status');

const error = {
  emailAlreadyExist: { status: s.alreadyExists, message: 'Email already exists, please choose another email' },
  userNotFound: { status: s.notFound, message: 'User not found'},
  incorrectPassword: {status: s.unauthorized, message: 'Incorrect Password'},
  ingredientNotFound: { status: s.notFound, message: 'Ingredient not found'},
  wrongObjectIdFormat: { status: s.invalidRequest, message: 'Wrong ObjectId format'},
  invalidIngredientName: { status: s.alreadyExists, message: 'Ingredient`s name already exists, please choose another name'},
  unauthorized: { status: s.unauthorized, message: 'You are not authorized!'},
  productNotFound: { status: s.notFound, message: 'Product doesnt exist'}
}

module.exports = error;