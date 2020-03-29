const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
  
const User = require('../models/user');

describe('/user', () => {
  beforeAll(done => {
    const url = process.env.DATABASE_CONN;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });

  afterEach(done => {
    User.deleteMany({}, () => {
      done();
    });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  describe('POST /user', () => {
    it('creates a new user in the database', done => {
      request(app)
        .post('/user')
        .send({
          name: 'test-name',
          password: 'test-password',
          friendCode: 'test-friend-code'
        })
        .then(res => {
          expect(res.status).toBe(201);
          User.findById(res.body._id, (_, user) => {
            expect(user.name).toBe('test-name');
            expect(user.password).toBe('test-password');
            expect(user.friendCode).toBe('test-test-friend-code');
            done();
          });
        });
    });
  });
});