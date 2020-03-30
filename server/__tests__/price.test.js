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
    it('/price/buy creates a new buy price', done => {
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

        Price.findById(res.body._id, (_, price) => {
          expect(price.bells).toBe(data.bells);
          expect(price.type).toBe(data.type);
          expect(price.date).toBe(data.date);
          expect(price.user.toString()).toEqual(user._id);
          done();
        })
      });
    })

    it('/price/sell creates a new sell price', done => {
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
        
        Price.findById(res.body._id, (_, price) => {
          expect(price.bells).toBe(data.bells);
          expect(price.type).toBe(data.type);
          expect(price.date).toBe(data.date);
          expect(price.user.toString()).toEqual(user._id);
          done();
        })
      });
    })

    it('requires a valid jwt', done => {
      const data = {
        bells: 500,
        type: 'sell',
      }
      PriceHelpers.postPrice(app, data, 'not-a-valid-token').then(res => {
        expect(res.status).toBe(401);

        Price.countDocuments((_, count) => {
          expect(count).toBe(0);
          done()
        })
      });
    })
  });

  describe('GET /price', () => {
    it('returns all prices',done => {
      const price1 = { bells: 600, type: 'buy' };
      const price2 = { bells: 500, type: 'sell' };
      PriceHelpers.postPrice(app, price1, token)
        .then(() => {
          PriceHelpers.postPrice(app, price2, token)
          .then(() => {
          PriceHelpers.getPrices(app, token).then(res => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            done();
            })
          })
        });
    });
  })
})
