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

const userNotFound = {
	email: 'emailnotregisted@email.com',
	password: 'seuze123',
};

const incorrectPassword = {
	email: 'seuze@lojinhadoseuze.com',
	password: 'incorrectPassword',
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
        expect(response.status.calledWith(s.created)).to.be.true;
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
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });
    });
  });

  /* ############################ LOGIN CONTROLLERS  ###########################*/

  describe('Testing login Controllers', () => {
    describe('When it is possible to login', () => {
      const response = {};
      const request = {};
      
      beforeEach(() => {
        request.body = userExample;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(userServices, 'login').resolves(userFound);
      });

      afterEach(() => {
        userServices.login.restore();
      });

      it('Status must be 201', async() => {
        await userControllers.login(request, response);
        expect(response.status.calledWith(s.success)).to.be.true;
      });
    });

    describe('When it is not possible to login', () => {
      const response = {};
      const request = {};
      const request2 = {};
      const request3 = {};
      const request4 = {};
      
      beforeEach(() => {
        request.body = {};
        request2.body = userNotFound;
        request3.body = incorrectPassword;
        request4.body = { name: 123, email: 'xablau@xablau.com'};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });

      it('With invalid data', async() => {
        await userControllers.login(request, response);
        expect(response.status.calledWith(s.invalidRequest)).to.be.true;
      });

      it('With not registered email', async() => {
        await userControllers.login(request2, response);
        expect(response.status.calledWith(s.notFound)).to.be.true;
      });

      it('With wrong password', async() => {
        await userControllers.login(request3, response);
        expect(response.status.calledWith(s.unauthorized)).to.be.true;
      });
    });
  });
});