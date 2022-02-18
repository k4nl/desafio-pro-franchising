const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

const connection = require('../mongoConnection');

const userModels = require('../../models/userModels')

const ingredientExample = {
	name: 'Cafe',
	unitOfMeasurement: 'kg',
	unitPrice: 25.00,
  quantity: 10,
  stockPrice: unitPrice * quantity,
};

const ingredientFound = {
  _id: '620d1e752b173482fbf65cdc',
  ingredient: {
    name: 'Cafe',
    unitOfMeasurement: 'kg',
    unitPrice: 25.00,
    quantity: 10,
    stockPrice: unitPrice * quantity
  }
}

describe('Testing ingredientModel', () => {
  let connectionMock;
  
  beforeEach(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db('SeuzeStore').collection('ingredients').insertOne({ ingredient : ingredientExample });
  });

  afterEach(async () => {
    await connectionMock.db('SeuzeStore').collection('ingredients').drop();
    await MongoClient.connect.restore();
  });

  describe('Testing o ingredientModels.create', () => {
    it('If it is possible to create an ingredient', async () => {
      const { ops } = await ingredientModels.createIngredient(ingredientExample);
      const { ingredient } = ops[0];
      expect(ingredient).to.not.be.null;
      expect(ingredient).to.deep.equal(ingredientExample);
    });
  });

  describe('Testing o ingredientModels.findIngredientById', () => {
    it('If it is possible to find a ingrdient by Id', async () => {
      const { ingredient } = await ingredientModels.findIngredientById(ingredientFound._id);
      expect(ingredient).to.not.be.null;
      expect(ingredient).to.deep.equal(ingredientFound);
    });
  });

  describe('Testing o ingredientModels.findAll', () => {
    it('If it is possible to find all ingrdientients', async () => {
      const ingredients = await ingredientModels.findAll();
      expect(ingredients).to.not.be.null;
      expect(ingredients).to.deep.equal([ingredientExample]);
    });
  });

  describe('Testing o ingredientModels.updateQuantity', () => {
    it('If it is possible to update an ingredient quantity', async () => {
      const { ops } = await ingredientModels.updateQuantity(ingredientExample._id, ingredientQuantity);
      const { quantity } = ops[0].ingredient;
      expect(quantity).to.not.be.null;
      expect(quantity).to.not.equal(ingredientExample.quantity);
    });
  });

  describe('Testing o ingredientModels.updatePrice', () => {
    it('If it is possible to update an ingredient quantity', async () => {
      const { ops } = await ingredientModels.updateQuantity(ingredientExample._id, ingredientPrice);
      const { quantity } = ops[0].ingredient;
      expect(quantity).to.not.be.null;
      expect(quantity).to.not.equal(ingredientExample.unitPrice);
    });
  });

  describe('Testing o ingredientModels.deleteIngredient', () => {
    it('If it is possible to delete an ingredient', async () => {
      const ingredients = await ingredientModels.findAll();
      const ingredient = await ingredientModels.deleteIngredient(ingredientExample._id);
      const ingredientsAfterDeleted = await ingredientModels.findAll();
      expect(ingredients).to.have.lengthOf(3);
      expect(ingredientsAfterDeleted).to.have.lengthOf(2);
      expect(ingredient).to.deep.equal(ingredientExample);
    });
  });


});
