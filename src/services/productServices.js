const ingredientServices = require('../services/ingredientServices');
const productModels = require('../models/productModels');
const schema = require('../schemas/productSchema');
const verify = require('../utils/functions');

const createProduct = async (productData) => {
  const { error } = schema.productSchema.validate(productData);
  verify.verifyJoiError(error);

  const allIngredients = await ingredientServices.findAll();
  verify.verifyIfAllIngredientsExists(allIngredients, productData.productIngredients);
  const { ops } = await productModels.createProduct(productData);
  return ops[0];
};

const findProductById = async (id) => {
  const product = await productModels.findProductById(id);
  verify.verifyIfProductExists(product);
  return product;
};

const findAllProducts = async () => { 
  return productModels.findAllProducts()
};

const uploadImage = async (productId, file) => {
  const product = await findProductById(productId);
  await productModels.uploadImage(productId, file.filename);
  return { ...product, image: `localhost:3002/src/uploads/${file.filename}`}
}

const deleteProduct = async (productId) => {
  const product = await findProductById(productId);
  await productModels.deleteProduct(productId);
  return product;
}



module.exports = {
  createProduct,
  uploadImage,
  findProductById,
  deleteProduct,
  findAllProducts,
}