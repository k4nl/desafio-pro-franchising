const Joi = require('@hapi/joi');
const sinon = require('sinon');
const { expect } = require('chai');

const userServices = require('../../services/userServices');
const userControllers = require('../../controllers/userControllers');

const e = require('../../utils/dictionary/errorObjects');
const s = require('../../utils/dictionary/status');

const userFound = {
  _id: '620d1e752b073482fbf65cdc',
  user: { name: 'Seu ze', email: 'seuze@lojinhadoseuze.com', password: 'seuze123', role: 'admin' }
};

const userExample = {
	name: 'Seu ze',
	email: 'seuze@lojinhadoseuze.com',
	password: 'seuze123',
  role: 'admin',
};

describe('Testing userControllers', () => {
  describe('Testing createUser', () => {
    describe('When it is possible to create an user', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = userExample;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(userServices, 'createUser').resolves(userFound);
      });

      afterEach(() => {
        userServices.createUser.restore();
      });

      it('Status must be 201', async() => {
        await userControllers.createUser(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });
    });

    describe('When it is not possible to create an user', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('With invalid data', async() => {
        await userControllers.createUser(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });
    });
  });
});