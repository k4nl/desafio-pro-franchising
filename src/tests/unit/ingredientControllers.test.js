const Joi = require('@hapi/joi');
const sinon = require('sinon');
const { expect } = require('chai');

const ingredientServices = require('../../services/ingredientServices');
const ingredientModels = require('../../models/ingredientModels');
const ingredientControllers = require('../../controllers/ingredientControllers');

const e = require('../../utils/dictionary/errorObjects');
const s = require('../../utils/dictionary/status');

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


const ingredientCreated = {
  _id: '621024f346b909f4afca5r28',
  ingredient: {
    name: 'leite',
    unitOfMeasurement: 'l',
    unitPrice: 10,
    quantity: 10,
    stockPrice: 100,
  }
}

  /* ############################ CREATING INGREDIENT  ###########################*/

describe('Testing ingredientControllers', () => {
  describe('Testing createIngredient', () => {
    describe('When it is possible to create an unique ingredient', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = ingredientExample;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientServices, 'createIngredient').resolves(ingredientCreated);
      });

      afterEach(() => {
        ingredientServices.createIngredient.restore();
      });

      it('Status must be 201', async() => {
        await ingredientControllers.createIngredient(request, response);
        expect(response.status.calledWith(s.created)).to.be.true;
      });
    });

    describe('When it is not possible to create an ingredient because invalid data', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('Should return an error', async() => {
        await ingredientControllers.createIngredient(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });

    describe('When it is not possible to create an ingredient because name is already taken', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = ingredientExample;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientModels, 'findIngredientByName').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientByName.restore();
      })

      it('Should return an error', async() => {
        await ingredientControllers.createIngredient(request, response);
        expect(response.status.calledWith(s.alreadyExists)).to.be.true;
      });
    });
  });

  /* ############################ FINDING INGREDIENT BY ID  ###########################*/

  describe('Testing findIngredientById', () => {
    describe('When it is possible to find an ingredient', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientServices, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientServices.findIngredientById.restore();
      });

      it('Status must be 200', async() => {
        await ingredientControllers.findIngredientById(request, response);
        expect(response.status.calledWith(s.success)).to.be.true;
      });
    });

    describe('When it is not possible find an ingredient with a invalid data', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('Should return an error', async() => {
        await ingredientControllers.findIngredientById(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });

    describe('When it is not possible find an ingredient because it doesnt exists', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      })

      it('Should return an error', async() => {
        await ingredientControllers.findIngredientById(request, response);
        expect(response.status.calledWith(s.notFound)).to.be.true;
      });
    });
  });

  /* ############################ FINDING ALL INGREDIENTS  ###########################*/

  describe('Testing finding all ingredients', () => {
    describe('When it is possible to find all ingredients', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientServices, 'findAll').resolves([ingredientFound, ingredientCreated]);
      });

      afterEach(() => {
        ingredientServices.findAll.restore();
      });

      it('Status must be 200', async() => {
        await ingredientControllers.findAll(request, response);
        expect(response.status.calledWith(s.success)).to.be.true;
      });
    });
  });

  /* ############################ UPDATING AN INGREDIENT ###########################*/

  describe('Testing update an ingredient', () => {
    describe('When it is possible to update an ingredient', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        
        request.body =
        {
          quantity: ingredientFound.ingredient.quantity,
          unitPrice: ingredientFound.ingredient.unitPrice,
        };
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientServices, 'updateIngredient').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientServices.updateIngredient.restore();
      });

      it('Status must be 200', async() => {
        await ingredientControllers.updateIngredient(request, response);
        expect(response.status.calledWith(s.success)).to.be.true;
      });
    });

    describe('When it is not possible to update an ingredient because invalid id', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: 'xablau' };
        request.body =
        {
          quantity: ingredientFound.ingredient.quantity,
          unitPrice: ingredientFound.ingredient.unitPrice,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('Status must be 422', async() => {
        await ingredientControllers.updateIngredient(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });

    describe('When it is not possible to update an ingredient because product not found', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body =
        {
          quantity: ingredientFound.ingredient.quantity,
          unitPrice: ingredientFound.ingredient.unitPrice,
        };
        request.params = { id: ingredientFound._id };
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });

      it('Status must be 404', async() => {
        await ingredientControllers.updateIngredient(request, response);
        expect(response.status.calledWith(s.notFound)).to.be.true;
      });
    });

    describe('When it is not possible to update an ingredient because invalid data', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body =
        { 
          unitPrice: ingredientFound.ingredient.unitPrice,
        };
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('Status must be 422', async() => {
        await ingredientControllers.updateIngredient(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });
  });

  /* ############################ DELETING AN INGREDIENT ###########################*/

  describe('Testing deleteIngredient', () => {
    describe('When it is possible to delete an ingredient', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientModels, 'findIngredientById').resolves(ingredientFound);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });

      it('Status must be 200', async() => {
        await ingredientControllers.deleteIngredient(request, response);
        expect(response.status.calledWith(s.success)).to.be.true;
      });
    });

    describe('When it is not possible do delete an ingredient because id invalid', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: 'xablau' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
  
      it('Status must be 422', async() => {
        await ingredientControllers.deleteIngredient(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });

    describe('When it is not possible do delete an ingredient because id not found', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.params = { id: ingredientFound._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ingredientModels, 'findIngredientById').resolves(null);
      });

      afterEach(() => {
        ingredientModels.findIngredientById.restore();
      });
  
      it('Status must be 404', async() => {
        await ingredientControllers.deleteIngredient(request, response);
        expect(response.status.calledWith(s.notFound)).to.be.true;
      });
    });
  });
});