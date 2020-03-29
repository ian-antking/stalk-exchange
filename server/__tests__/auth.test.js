const app = require('../src/app');
const mongoose = require('mongoose');
const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
  let userData;

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

  beforeEach((done) => {
    userData = DataFactory.user();
    UserHelpers.signUp(app, userData).then(() => {
      done();
    });
  });
  
  describe('POST', () => {
    describe('/auth/login', () => {
      it('issues a web token', (done) => {
        UserHelpers.login(app, userData)
          .then(res => {
            expect(res.status).toBe(200);
            const token = jwt.decode(res.body.token);
            expect(token).tohaveProperty('_id');
            expect(token).tohaveProperty('name');
            expect(token).tohaveProperty('island');
            expect(token).tohaveProperty('friendCode');
            done();
          })
          .catch(error => done(error));
      });
    });
    it('handles invalid authentication', (done) => {
      UserHelpers.login(app, DataFactory.user())
        .then(res => {
          expect(res.status).toBe(401);
          done();
        })
        .catch(error => done(error));
    });
  });
});