const sinon = require('sinon');
const { expect } = require('chai');


const productModels = require('../../models/productModels');
const productServices = require('../../services/productServices');

const e = require('../../utils/dictionary/errorObjects');
const s = require('../../utils/dictionary/status');
const CustomError = require('../../middlewares/CustomError');


const productExample = {
  _id: '621024f346b909f4afca5b28',
  product: {
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
  },
};

describe('Testing productServices', () => {

  /* ############################## CREATE INGREDIENT TESTS ################################ */

  describe('Testing createProduct', () => {

    describe('When the data received is correct', () => {
      
      beforeEach(() => {
        sinon.stub(productServices, 'createProduct').resolves(ingredientFound);
      });

      afterEach(() => {
        productServices.createProduct.restore();
      });
      
      it('It should returns the ingredient created', async () => {
        const productCreated = await productServices.createProduct(productExample);

        expect(productCreated).to.be.a('object');
        expect(productCreated).to.have.property('_id');
        expect(productCreated.product.name).to.deep.equal(productExample.name);
        expect(productCreated.product.image).to.deep.equal(productExample.image);
        expect(productCreated.product.price).to.deep.equal(productExample.price);
        expect(productCreated.product.productIngredients).to.deep.equal(productExample.productIngredients);
      });
    });

    describe('When it receives an invalid data', () => {

      describe('When name it is not a string', () => {
        it('Should returns a error', async () => {
          try {
              await productServices.createProduct({ ...productExample, name: 123 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"name" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When image it is not a string', () => {
        it('Should returns a error', async () => {
          try {
              await productServices.createProduct({ ...productExample, image: 123 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"image" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When price it is not a number', () => {
        it('Should returns a error', async () => {
          try {
              await productServices.createProduct({ ...productExample, price: 'xablau' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"price" must be a number',status: s.invalidRequest }));
          }
        });
      });

      describe('When price it is not bigger than 0', () => {
        it('Should returns a error', async () => {
          try {
              await productServices.createProduct({ ...productExample, price: -1 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"price" must be greater than or equal to 0',status: s.invalidRequest }));
          }
        });
      });

      describe('When productIngredients it is not a empty array', () => {
        it('Should returns a error', async () => {
          try {
              await productServices.createProduct({ ...productExample, productIngredients: [] });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"quantity" must be a number', status: s.invalidRequest }));
          }
        });
      });

    });
  });
});