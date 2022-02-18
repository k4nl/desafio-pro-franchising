const connection = require('./connection');

const createUser = async (userData) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ user: userData });
  return user;
};

const findUserByEmail = async (userEmail) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ 'user.email': userEmail });
  console.log(user);
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};