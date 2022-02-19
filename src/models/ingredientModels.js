const connection = require('./connection');
const { ObjectId } = require('mongodb')

const createIngredient = async (ingredientData) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients')
  .insertOne({ ingredient: ingredientData });
  return ingredient;
};

const findIngredientById = async (ingredientId) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients')
  .findOne({ _id: ObjectId(ingredientId) });
  return ingredient;
};

const findAll = async () => {
  const db = await connection();
  const ingredients = await db.collection('ingredients')
  .find({}).toArray();
  return ingredients;
};

const updateQuantity = async (ingredientId, newQuantity, price) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients').updateOne(
    { _id: ObjectId(ingredientId) },
    { $set: { 'ingredient.quantity': Number(newQuantity), 'ingredient.stockPrice': Number(newQuantity * price) } },
  );
  return ingredient;
};

const updatePrice = async (ingredientId, newPrice, quantity) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients').updateOne(
    { _id: ObjectId(ingredientId)},
    { $set: { 'ingredient.unitPrice': Number(newPrice), 'ingredient.stockPrice': Number(quantity * newPrice) } },
  );
  return ingredient;
};

const deleteIngredient = async (ingredientId) => {
  const db = await connection();
  await db.collection('ingredients').deleteOne({ _id: ObjectId(ingredientId) });
};


module.exports = {
  createIngredient,
  findIngredientById,
  findAll,
  updateQuantity,
  updatePrice,
  deleteIngredient,
};