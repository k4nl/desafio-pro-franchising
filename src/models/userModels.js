const connection = require('./connection');

const createUser = async (userData) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ user: userData });
  return user;
};

module.exports = {
  createUser,
};