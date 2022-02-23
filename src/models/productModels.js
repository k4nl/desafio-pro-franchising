const connection = require('./connection');
const { ObjectId } = require('mongodb')

const createProduct = async (productData) => {
  const db = await connection();
  const product = await db.collection('products')
  .insertOne({ product: productData });
  return product;
};

const findProductById = async (productId) => {
  const db = await connection();
  const product = await db.collection('products')
  .findOne({ _id: ObjectId(productId) });
  return product;
}

const updateProduct = async (productId, productData) => {
  const db = await connection();
  const product = await db.collection('products')
  .updateOne(
    { _id: ObjectId(productId) },
    { $set: {
      'product.price': productData.price,
      'product.productIngredients': productData.productIngredients,
      }
    },
  );
  return product;
};

const findAllProducts = async () => {
  const db = await connection();
  return db.collection('products').find({}).toArray();
}


const deleteProduct = async (productId) => {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(productId) });
};


const uploadImage = async (productId, filename) => {
  const db = await connection();
  return db.collection('products').findOneAndUpdate(
    { _id: ObjectId(productId) },
    { $set: { image: `localhost:3002/src/uploads/${filename}`} },
  )
}


module.exports = {
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
  findAllProducts,
};