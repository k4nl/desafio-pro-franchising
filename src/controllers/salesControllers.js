const salesServices = require('../services/salesServices');
const s = require('../utils/dictionary/status');

const register = async (req, res) => {
  try {
    const sale = await salesServices.register(req.body);
    return res.status(s.success).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
}

module.exports = {
  register,
}