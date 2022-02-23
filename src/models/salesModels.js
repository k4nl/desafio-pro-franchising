const connection = require('./connection');

const createSale = async (saleData) => {
  const db = await connection();
  const sale = await db.collection('sales')
  .insertOne({ sale: saleData });
  return sale;
};

module.exports = {
  createSale,
}