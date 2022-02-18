const { ObjectId } = require('mongodb');
const userModels = require('../models/userModels');
const CustomError = require('../middlewares/CustomError');
const e = require('../utils/dictionary/status');
const schema = require('../schemas/userSchema');
const verify = require('../utils/functions');

const createUser = async (user) => {
  const { error } = schema.userSchema.validate(user);
  verify.verifyJoiError(error);
  
  const emailAlreadyTaken = await userModels.findUserByEmail(user.email);

  verify.verifyIfUserEmailExists(emailAlreadyTaken);

  const { insertedId } = await userModels.createUser(user);

  return { _id: ObjectId(insertedId), user: { name: user.name, email: user.email, role: user.role } };
};


module.exports = {
  createUser,
};