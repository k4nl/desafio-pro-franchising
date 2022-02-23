const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const findIngredientByName = async (ingredientName) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients')
  .findOne({ 'ingredient.name': ingredientName });
  return ingredient;
};

const findAll = async () => {
  const db = await connection();
  const ingredients = await db.collection('ingredients')
  .find({}).toArray();
  return ingredients;
};

const updateIngredient = async (ingredientId, newData) => {
  const db = await connection();
  await db.collection('ingredients').updateOne(
    { _id: ObjectId(ingredientId) },
    { $set: {
      'ingredient.quantity': newData.quantity,
      'ingredient.unitPrice': newData.unitPrice,
      'ingredient.stockPrice': newData.stockPrice,
      }
    },
  );
};


const deleteIngredient = async (ingredientId) => {
  const db = await connection();
  await db.collection('ingredients').deleteOne({ _id: ObjectId(ingredientId) });
};

const decreaseIngredientStock = async (ingredient) => {
  const db = await connection();
  return db.collection('ingredients').updateOne(
    { _id: ObjectId(ingredient._id) },
    { $inc: {
      'ingredient.quantity': -ingredient.quantity,
      'ingredient.stockPrice': -ingredient.stockPrice,
      },
    },
  );
}


module.exports = {
  createIngredient,
  findIngredientById,
  findIngredientByName,
  findAll,
  updateIngredient,
  deleteIngredient,
  decreaseIngredientStock,
};