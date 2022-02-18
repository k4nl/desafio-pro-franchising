const userServices = require('../services/userServices');
const s = require('../utils/dictionary/status');

const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    return res.status(s.created).json(user);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};


module.exports = {
  createUser,
};