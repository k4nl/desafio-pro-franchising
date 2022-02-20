const sinon = require('sinon');
const { expect } = require('chai');


const ingredientModels = require('../../models/ingredientModels');
const ingredientServices = require('../../services/ingredientServices');

const e = require('../../utils/dictionary/errorObjects');
const s = require('../../utils/dictionary/status');
const CustomError = require('../../middlewares/CustomError');

const ingredientExample = {
	name: 'cafe',
	unitOfMeasurement: 'kg',
	unitPrice: 25,
  quantity: 10,
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


const ingredientFound2 = {
  _id: '621024f346b909f4afca5r28',
  ingredient: {
    name: 'leite',
    unitOfMeasurement: 'l',
    unitPrice: 10,
    quantity: 10,
    stockPrice: 100,
  }
}

describe('Testing ingredientServices', () => {

  /* ############################## CREATE INGREDIENT TESTS ################################ */

  describe('Testing createIngredient', () => {

    describe('When the data received is correct', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientByName').resolves(null);
        sinon.stub(ingredientServices, 'createIngredient').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientByName.restore();
        ingredientServices.createIngredient.restore();
      });
      
      it('It should returns the ingredient created', async () => {
        const ingredientCreated = await ingredientServices.createIngredient(ingredientExample);

        expect(ingredientCreated).to.be.a('object');
        expect(ingredientCreated).to.have.property('_id');
        expect(ingredientCreated.ingredient.name).to.deep.equal(ingredientExample.name);
        expect(ingredientCreated.ingredient.unitOfMeasurement).to.deep.equal(ingredientExample.unitOfMeasurement);
        expect(ingredientCreated.ingredient.unitPrice).to.deep.equal(ingredientExample.unitPrice);
        expect(ingredientCreated.ingredient.quantity).to.deep.equal(ingredientExample.quantity);
        expect(ingredientCreated.ingredient.stockPrice).to.deep.equal(ingredientExample.quantity * ingredientExample.unitPrice);
      });
    });

    describe('When it receives an invalid data', () => {

      describe('When name it is not a string', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, name: 123 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"name" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When unitOfMeasurement it is not a string', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, unitOfMeasurement: 123 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"unitOfMeasurement" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When unitPrice it is not a number', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, unitPrice: 'xablau' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"unitPrice" must be a number',status: s.invalidRequest }));
          }
        });
      });

      describe('When unitPrice it is not bigger than 0', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, unitPrice: -1 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"unitPrice" must be greater than or equal to 0',status: s.invalidRequest }));
          }
        });
      });

      describe('When quantity it is not a number', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, quantity: 'xablau' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"quantity" must be a number', status: s.invalidRequest }));
          }
        });
      });

      describe('When quantity it is not bigger than 0', () => {
        it('Should returns a error', async () => {
          try {
              await ingredientServices.createIngredient({ ...ingredientExample, quantity: -1 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"quantity" must be greater than or equal to 0', status: s.invalidRequest }));
          }
        });
      });
    });
  });

/* ########################## FINDING INGREDIENT BY ID  ####################################*/

  describe('Testing finding ingredient by id function', () => {

    describe('When its possible to find a ingredient', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should returns the ingredient', async () => {
        const ingredient = await ingredientServices.findIngredientById(ingredientFound._id);
        console.log(ingredient);

        expect(ingredient).to.be.a('object');
        expect(ingredient).to.have.property('_id');
        expect(ingredient.ingredient.name).to.deep.equal(ingredientFound.ingredient.name);
        expect(ingredient.ingredient.unitOfMeasurement).to.deep.equal(ingredientFound.ingredient.unitOfMeasurement);
        expect(ingredient.ingredient.unitPrice).to.deep.equal(ingredientFound.ingredient.unitPrice);
        expect(ingredient.ingredient.quantity).to.deep.equal(ingredientFound.ingredient.quantity);
        expect(ingredient.ingredient.stockPrice).to.deep.equal(ingredientFound.ingredient.stockPrice);
      });
    });

    describe('When it cannot find the ingredient because it doesnt exists', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
            await ingredientServices.findIngredientById(ingredientFound._id);
        } catch (error) {
          expect(error).to.deep.equal(new CustomError(e.ingredientNotFound));
        }
      });
    });

    describe('When it receives a wrong id', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
            await ingredientServices.findIngredientById('xablau');
        } catch (error) {
          expect(error).to.deep.equal(new CustomError(e.wrongObjectIdFormat));
        }
      });
    });
  });

  describe('Testing finding all ingredients ', () => {

    describe('When its possible to find all ingredient', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findAll').resolves([ingredientFound, ingredientFound2]);
      });

      afterEach(() => {
        ingredientModels.findAll.restore();
      });
      
      it('It should returns all ingredients', async () => {
        const ingredients = await ingredientServices.findAll();

        expect(ingredients).to.be.a('array');
        expect(ingredients).to.have.lengthOf(2);
        expect(ingredients[0].ingredient.name).to.deep.equal(ingredientFound.ingredient.name);
        expect(ingredients[1].ingredient.name).to.deep.equal(ingredientFound2.ingredient.name);
        expect(ingredients[0].ingredient.unitOfMeasurement).to.deep.equal(ingredientFound.ingredient.unitOfMeasurement);
        expect(ingredients[0].ingredient.unitPrice).to.deep.equal(ingredientFound.ingredient.unitPrice);
        expect(ingredients[1].ingredient.quantity).to.deep.equal(ingredientFound2.ingredient.quantity);
        expect(ingredients[1].ingredient.stockPrice).to.deep.equal(ingredientFound2.ingredient.stockPrice);
      });
    });

    describe('When it does not have any ingredients', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findAll').resolves([]);
      });

      afterEach(() => {
        ingredientModels.findAll.restore();
      });
      
      it('It should return an empty array', async () => {
        const ingredient = await ingredientServices.findAll();
        expect(ingredient).to.be.a('array');
        expect(ingredient).to.have.lengthOf(0);
      });
    });
  });

  describe.only('Testing update the the ingredient ', () => {

    describe('When its possible to update the ingredient', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientServices, 'findIngredientById').resolves(ingredientFound._id);
      });

      afterEach(() => {
        ingredientServices.findIngredientById.restore();
      });
      
      it('It should returns the ingredient with the new quantity, unitPrice and stockPrice', async () => {
        const ingredient = await ingredientServices.updateIngredient(ingredientFound._id, { quantity: 100, unitPrice: 250 });

        expect(ingredient).to.be.a('object');
        expect(ingredient._id).to.deep.equal(ingredientFound._id);
        expect(ingredient.ingredient.name).to.deep.equal(ingredientFound.ingredient.name);
        expect(ingredient.ingredient.unitOfMeasurement).to.deep.equal(ingredientFound.ingredient.unitOfMeasurement);
        expect(ingredient.ingredient.unitPrice).to.not.equal(ingredientFound.ingredient.unitPrice);
        expect(ingredient.ingredient.quantity).to.deep.equal(100);
        expect(ingredient.ingredient.stockPrice).to.deep.equal(100 * 250);
      });
    });

    describe('When it is not possible to update because the ingredient doesnt exist', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
          await ingredientServices.updateIngredient(ingredientFound._id, { quantity: 100, unitPrice: 250 });
      } catch (error) {
        expect(error).to.deep.equal(new CustomError(e.ingredientNotFound));
      }
      });
    });

    describe('When it is not possible to update because the quantity is smaller than 0', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
          await ingredientServices.updateIngredient(ingredientFound._id, { quantity: -25, unitPrice: 250 });
      } catch (error) {
        expect(error).to.deep.equal(new CustomError({ status: s.invalidRequest, message: '"quantity" must be greater than or equal to 0'}));
      }
      });
    });
  });

    describe('When it is not possible to update the ingredient because unitPrice it is smaller than 0', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
          await ingredientServices.updateIngredient(ingredientFound._id, { quantity: 100, unitPrice: -250 });
      } catch (error) {
        expect(error).to.deep.equal(new CustomError({ status: s.invalidRequest, message: '"unitPrice" must be greater than or equal to 0'}));
      }
      });
    });
  });

  describe('Testing delete ingredient function ', () => {

    describe('When its possible to delete an ingredient', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should returns the deleted ingredient', async () => {
        const ingredient = await ingredientServices.deleteIngredient(ingredientFound._id);

        expect(ingredient).to.be.a('object');
        expect(ingredient._id).to.deep.equal(ingredientFound._id);
        expect(ingredient.ingredient).to.deep.equal(ingredientFound);
      });
    });

    describe('When it is not possible to delete because the ingredient doesnt exist', () => {
      
      beforeEach(() => {
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
      
      it('It should return an error', async () => {
        try {
          await ingredientServices.deleteIngredient(ingredientFound._id,);
      } catch (error) {
        expect(error).to.deep.equal(new CustomError(e.ingredientNotFound));
      }

    });
  });
});