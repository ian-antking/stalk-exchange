const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
  
const User = require('../src/models/user');

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
          island: 'test-island',
          password: 'test-password',
          friendCode: 'test-friend-code'
        })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe('test-name');
          expect(res.body.island).toBe('test-island');
          expect(res.body.friendCode).toBe('test-friend-code');
          expect(res.body).not.toHaveProperty('password');

          User.findById(res.body._id, (_, user) => {
            expect(user.name).toBe('test-name');
            expect(user.friendCode).toBe('test-friend-code');
            done();
          });
        });
    });
  });
});