const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

const connection = require('../mongoConnection');

const productModels = require('../../models/productModels')

const productExample = {
  name: 'cafe com leite',
  image: 'https://static1.conquistesuavida.com.br/articles//2/19/72/@/5471-pensando-de-forma-saudavel-o-indicado-article_gallery-2.jpg',
  price: 3,
  productIngredients: [
    {
      ingredientId: '621024f346b909f4afca5b28',
      quantity: 10,
      unitOfMeasurement: 'g'
    },
    {
      ingredientId: '621024f346b909f4afca5r28',
      quantity: 10,
      unitOfMeasurement: 'ml'
    },
  ],
};

const productData = {
  price: 10,
  image: 'outraimagem.png',
  productIngredients: [
    {
      ingredientId: '621024f346b909f4afca5b28',
      quantity: 10,
      unitOfMeasurement: 'g'
    },
  ],
}


describe('Testing productModels', () => {
  let connectionMock;
  let productId;
  
  beforeEach(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('SeuzeStore')
    .collection('products')
    .insertOne({ product : productExample });
    productId = insertedId;
  });

  afterEach(async () => {
    await connectionMock.db('SeuzeStore').collection('products').drop();
    await MongoClient.connect.restore();
  });

  describe('Testing o productModels.createProduct', () => {
    it('should be possible to create a product', async () => {
      const { ops } = await productModels.createProduct(productExample);
      const { product } = ops[0];
      expect(product).to.not.be.null;
      expect(product).to.deep.equal(productExample);
    });
  });

  describe('Testing o productModels.findProductById', () => {
    it('should be possible to find a ingredient by Id', async () => {
      const { product } = await productModels.findProductById(productId);
      expect(product).to.not.be.null;
      expect(product).to.deep.equal(productExample);
    });
  });

  describe('Testing o productModels.updateproduct', () => {
    it('should be possible to update an product', async () => {
      await productModels.updateProduct(productId, productData);
      const { product } = await productModels.findProductById(productId);
      
      expect(product.price).to.deep.equal(productData.price);
      expect(product.productIngredients).to.deep.equal(productData.productIngredients);
    });
  });

  describe('Testing o productModels.deleteproduct', () => {
    it('should be possible to delete an product', async () => {
      const product = await productModels.findProductById(productId);
      await productModels.deleteProduct(productId);
      const productsAfterDeleted = await productModels.findProductById(productId);
      expect(product).to.not.be.null;
      expect(productsAfterDeleted).to.be.null;
    });
  });

  describe('Testing o productModels.uploadProductImage', () => {
    it('should be possible to delete an product', async () => {
      const product = await productModels.findProductById(productId);
      await productModels.uploadProductImage(productId);
      const productsAfterDeleted = await productModels.findProductById(productId);
      expect(product).to.not.be.null;
      expect(productsAfterDeleted).to.be.null;
    });
  });


});
