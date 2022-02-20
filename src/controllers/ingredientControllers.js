const ingredientServices = require('../services/ingredientServices');
const s = require('../utils/dictionary/status');

const createIngredient = async (req, res) => {
  try {
    const ingredient = await ingredientServices.createIngredient(req.body);
    return res.status(s.created).json(ingredient);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const findIngredientById = async (req, res) => {
  try {
    const ingredient = await ingredientServices.findIngredientById(req.params.id);
    return res.status(s.success).json(ingredient);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

const findAll = async (_req, res) => {
  try {
    const ingredients = await ingredientServices.findAll();
    return res.status(s.success).json(ingredients);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};


const updateIngredient = async (req, res) => {
  const { quantity, unitPrice } = req.body;
  try {
    const ingredient = await ingredientServices.updateIngredient(req.params.id, { quantity, unitPrice });
    return res.status(s.success).json(ingredient);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};


const deleteIngredient = async (req, res) => {
  try {
    const ingredients = await ingredientServices.deleteIngredient(req.params.id);
    return res.status(s.success).json(ingredients);
  } catch (error) {
    return res.status(error.status).json(error);
  }
};


module.exports = {
  createIngredient,
  findIngredientById,
  findAll,
  updateIngredient,
  deleteIngredient,
};