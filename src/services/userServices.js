const { ObjectId } = require('mongodb');
const userModels = require('../models/userModels');
const CustomError = require('../middlewares/CustomError');
const e = require('../utils/dictionary/status');
const schema = require('../schemas/userSchema');
const verify = require('../utils/functions');
const auth = require('../middlewares/auth');

const createUser = async (user) => {
  const { error } = schema.userSchema.validate(user);
  verify.verifyJoiError(error);
  
  const emailAlreadyTaken = await userModels.findUserByEmail(user.email);

  verify.verifyIfUserEmailExists(emailAlreadyTaken);

  const { insertedId } = await userModels.createUser(user);

  return { _id: ObjectId(insertedId), user: { name: user.name, email: user.email, role: user.role } };
};

const login = async (userData) => {
  const { error } = schema.loginSchema.validate(userData);
  verify.verifyJoiError(error);

  const userFound = await userModels.findUserByEmail(userData.email);
  console.log(userFound);
  verify.verifyUser(userFound);
  verify.verifyPassword(userFound, userData.password);

  const { _id, user } = userFound;

  return { token: auth.createToken(_id, user.email, user.role), user: { name: user.name, email: user.email } };
};


module.exports = {
  createUser,
  login,
};