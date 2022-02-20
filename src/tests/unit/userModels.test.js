const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

const connection = require('../mongoConnection');

const userModels = require('../../models/userModels')

const userExample = {
	name: 'Seu ze',
	email: 'seuze@lojinhadoseuze.com',
	password: 'seuze123',
  role:'admin'
};

describe('Testing userModel', () => {
  let connectionMock;
  
  beforeEach(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    await connectionMock.db('SeuzeStore').collection('users').insertOne({ user : userExample });
  });

  afterEach(async () => {
    await connectionMock.db('SeuzeStore').collection('users').drop();
    await MongoClient.connect.restore();
  });

  describe('Testing o userModels.create', () => {
    it('If it is possible to create an user', async () => {
      const { ops } = await userModels.createUser(userExample);
      const user = ops[0].user;
      expect(user).to.not.be.null;
      expect(user).to.deep.equal(userExample);
    });
  });

  describe('Testing o userModels.findUserByEmail', () => {
    it('If it is possible to find a user by email', async () => {
      const { user } = await userModels.findUserByEmail(userExample.email);
      expect(user).to.not.be.null;
      expect(user).to.deep.equal(userExample);
    });
  });

});
