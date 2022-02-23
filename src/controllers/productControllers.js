const productServices = require('../services/productServices');
const s = require('../utils/dictionary/status');

const createProduct = async (req, res) => {
  try {
    const product = await productServices.createProduct(req.body);
    return res.status(s.created).json(product);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
};

const findProductById = async (req, res) => {
  try {
    const product = await productServices.findProductById(req.params.id);
    return res.status(s.success).json(product);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
};

const findAllProducts = async (req, res) => {
  try {
    const products = await productServices.findAllProducts();
    return res.status(s.success).json(products);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    const product = await productServices.uploadImage(req.params.id, req.file);
    return res.status(s.success).json(product);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productServices.deleteProduct(req.params.id);
    return res.status(s.sucess).json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
}


module.exports = {
  createProduct,
  uploadImage,
  findProductById,
  deleteProduct,
  findAllProducts,
}