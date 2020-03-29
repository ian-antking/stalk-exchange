const app = require('../src/app');
const mongoose = require('mongoose');
const UserHelpers = require('./helpers/user-helpers');
const PriceHelpers = require('./helpers/price-helpers');
const DataFactory = require('./helpers/data-factory');
const User = require('../src/models/user');

describe('/price', () => {
  let userData;
  let token;

  beforeAll(done => {
    const url = process.env.DATABASE_CONN;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });

  beforeEach((done) => {
    userData = DataFactory.user();
    UserHelpers.signUp(app, userData).then(() => {
      UserHelpers.login(app, userData).then((res) => {
        token = res.body.token;
        done();
      })
    });
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

  describe('POST /price', () => {
    it('creates a new buy price', () => {
      const data = {
        bells: 500,
        type: 'buy',
      }
      PriceHelpers.postPrice(app, data, token).then(res => {
        expect(res.status).toBe(201);
      });
    })
  });
});