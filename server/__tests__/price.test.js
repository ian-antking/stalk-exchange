const app = require('../src/app');
const mongoose = require('mongoose');
const UserHelpers = require('./helpers/user-helpers');
const PriceHelpers = require('./helpers/price-helpers');
const DataFactory = require('./helpers/data-factory');
const User = require('../src/models/user');
const Price = require('../src/models/price');

describe('/price', () => {
  let userData;
  let user;
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
    UserHelpers.signUp(app, userData).then((res) => {
      user = res.body;
      UserHelpers.login(app, userData).then((res) => {
        token = res.body.token;
        done();
      })
    });
  });

  afterEach(done => {
    User.deleteMany({}, () => {
      Price.deleteMany({}, () => {
        done();
      })
    });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  describe('POST /price', () => {
    it('/price/buy creates a new buy price', () => {
      const data = {
        bells: 500,
        type: 'buy',
        date: 123456789,
      }
      PriceHelpers.postPrice(app, data, token).then(res => {
        expect(res.status).toBe(201);
        expect(res.body.bells).toBe(data.bells);
        expect(res.body.type).toBe(data.type);
        expect(res.body.user).toBe(user._id);
        expect(res.body.date).toBe(data.date);
      });
    })

    it('/price/sell creates a new sell price', () => {
      const data = {
        bells: 500,
        type: 'sell',
        date: 987654321,
      }
      PriceHelpers.postPrice(app, data, token).then(res => {
        expect(res.status).toBe(201);
        expect(res.body.bells).toBe(data.bells);
        expect(res.body.type).toBe(data.type);
        expect(res.body.user).toBe(user._id);
        expect(res.body.date).toBe(data.date);
      });
    })

    it('requires a valid jwt', () => {
      const data = {
        bells: 500,
        type: 'sell',
      }
      PriceHelpers.postPrice(app, data, 'not-a-valid-token').then(res => {
        expect(res.status).toBe(401);
      });
    })
  });

  describe('GET /price', () => {
    it('returns all prices',() => {
      const prices = [
        { bells: 500, type: 'sell' },
        { bells: 600, type: 'buy' },
      ]
      Promise.all(PriceHelpers.manyPrices(app, prices, token))
        .then(() => {
          PriceHelpers.getPrices(app, token).then(res => {
            expect(res.status).toBe(200);
          })
        });
    })
  })
});