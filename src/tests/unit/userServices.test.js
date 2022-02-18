const sinon = require('sinon');
const { expect } = require('chai');


const userModels = require('../../models/userModels');
const userServices = require('../../services/userServices');

const e = require('../../utils/dictionary/errorObjects');
const s = require('../../utils/dictionary/status');
const CustomError = require('../../middlewares/CustomError');

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

describe('Testing userServices', () => {

  describe('Testing createUser', () => {

    describe('When can not find an email', () => {
      
      beforeEach(() => {
        sinon.stub(userModels, 'findUserByEmail').resolves(null);
        sinon.stub(userModels, 'createUser').resolves(userExample);
      });

      afterEach(() => {
        userModels.findUserByEmail.restore();
        userModels.createUser.restore();
      });
      
      it('It should returns the created user', async () => {
        const userCreated = await userServices.createUser(userExample);

        expect(userCreated).to.be.a('object');
        expect(userCreated).to.have.property('_id');
        expect(userCreated).to.not.have.property('password');
        expect(userCreated.user.name).to.deep.equal(userExample.name);
        expect(userCreated.user.email).to.deep.equal(userExample.email);
        expect(userCreated.user.role).to.deep.equal(userExample.role);
      });
    });

    describe('When it finds an email', () => {
      
      beforeEach(() => {
        sinon.stub(userModels, 'findUserByEmail').resolves(userFound);
      });

      afterEach(() => {
        userModels.findUserByEmail.restore();
      });
      
      it('It should return an error', async () => {
        try {
            await userServices.createUser(userExample);
        } catch (error) {
          expect(error).to.deep.equal(new CustomError(e.emailAlreadyExist));
        }
      });
    });

    describe('When it receives an invalid data', () => {

      describe('When name it is not a string', () => {
        it('Deve retornar um erro', async () => {
          try {
              await userServices.createUser({ name: 123, password: '123456', email: 'email@email.com', role: 'user' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"name" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When password it is not a string', () => {
        it('Deve retornar um erro', async () => {
          try {
              await userServices.createUser({ name: 'seuze', password: true, email: 'email@email.com', role: 'user' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"password" must be a string', status: s.invalidRequest }));
          }
        });
      });

      describe('When email it is not a string', () => {
        it('Deve retornar um erro', async () => {
          try {
              await userServices.createUser({ name: 'seuze', password: '123', email: 1234, role: 'user' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"email" must be a string',status: s.invalidRequest }));
          }
        });
      });

      describe('When email it is not a valid email', () => {
        it('Deve retornar um erro', async () => {
          try {
              await userServices.createUser({ name: 'seuze', password: '123', email: 'seuze', role: 'user' });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"email" must be a valid email', status: s.invalidRequest }));
          }
        });
      });

      describe('When role it is not a string', () => {
        it('Deve retornar um erro', async () => {
          try {
              await userServices.createUser({ name: 'seuze', password: '123', email: 'seuze@email.com', role: 123 });
          } catch (error) {
            expect(error).to.deep.equal(new CustomError({ message: '"role" must be a string', status: s.invalidRequest }));
          }
        });
      });
    });
  });
});