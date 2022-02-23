const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

const connection = require('../mongoConnection');

const ingredientModels = require('../../models/ingredientModels')

const ingredientExample = {
	name: 'cafe',
	unitOfMeasurement: 'kg',
	unitPrice: 25,
  quantity: 10,
  stockPrice: 250,
};

const ingredientUpdateQuantity = {
  _id: '621024f346b909f4afca5b28',
  quantity: 20,
}

const ingredientFound = {
  _id: '621024f346b909f4afca5b28',
  ingredient: {
    name: 'cafe',
    unitOfMeasurement: 'kg',
    unitPrice: 25,
    quantity: 10,
    stockPrice: 250,
  }
}

describe('Testing ingredientModel', () => {
  let connectionMock;
  let ingredientId;
  
  beforeEach(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const { insertedId } = await connectionMock.db('SeuzeStore')
    .collection('ingredients')
    .insertOne({ ingredient : ingredientExample });
    ingredientId = insertedId;
  });

  afterEach(async () => {
    await connectionMock.db('SeuzeStore').collection('ingredients').drop();
    await MongoClient.connect.restore();
  });

  describe('Testing o ingredientModels.createIngredient', () => {
    it('should be possible to create an ingredient', async () => {
      const { ops } = await ingredientModels.createIngredient(ingredientExample);
      const { ingredient } = ops[0];
      expect(ingredient).to.not.be.null;
      expect(ingredient).to.deep.equal(ingredientExample);
    });
  });

  describe('Testing o ingredientModels.findIngredientById', () => {
    it('should be possible to find a ingredient by Id', async () => {
      const { ingredient } = await ingredientModels.findIngredientById(ingredientId);
      expect(ingredient).to.not.be.null;
      expect(ingredient).to.deep.equal(ingredientFound.ingredient);
    });
  });

  describe('Testing o ingredientModels.findAll', () => {
    it('should be possible to find all ingredientients', async () => {
      const ingredients = await ingredientModels.findAll();
      expect(ingredients).to.not.be.null;
      expect(ingredients).to.have.lengthOf(1);
      expect(ingredients[0].ingredient).to.deep.equal(ingredientFound.ingredient);
    });
  });

  describe('Testing o ingredientModels.updateIngredient', () => {
    it('should be possible to update an ingredient', async () => {
      await ingredientModels.updateIngredient(ingredientId, { quantity: 100, unitPrice: 20, stockPrice: 2000 });
      const { ingredient } = await ingredientModels.findIngredientById(ingredientId);
      
      expect(ingredient.quantity).to.not.equal(ingredientExample.quantity);
      expect(ingredient.stockPrice).to.deep.equal(Number(ingredient.quantity * ingredient.unitPrice));
    });
  });


  describe('Testing o ingredientModels.deleteIngredient', () => {
    it('should be possible to delete an ingredient', async () => {
      const ingredients = await ingredientModels.findAll();
      await ingredientModels.deleteIngredient(ingredientId);
      const ingredientsAfterDeleted = await ingredientModels.findAll();
      expect(ingredients).to.have.lengthOf(1);
      expect(ingredientsAfterDeleted).to.have.lengthOf(0);
    });
  });

  describe('Testing o ingredientModels.findIngredientByName', () => {
    it('should be possible to find an ingredient', async () => {
      const { ingredient } = await ingredientModels.findIngredientByName(ingredientExample.name);
      expect(ingredient).to.deep.equal(ingredientFound.ingredient);
    });
  });
});
