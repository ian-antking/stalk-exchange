const mongoose = require('mongoose');
const app = require('../src/app');

const User = require('../src/models/user');
const UserHelper = require('./helpers/user-helpers');
const PriceHelper = require('./helpers/price-helpers');
const DataFactory = require('./helpers/data-factory');

describe('/user', () => {
  beforeAll((done) => {
    const url = process.env.DATABASE_CONN;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });

  afterEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  describe('POST /user', () => {
    it('creates a new user in the database', (done) => {
      const userData = DataFactory.user();
      UserHelper.signUp(app, userData).then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(userData.name);
        expect(res.body.island).toBe(userData.island);
        expect(res.body.dodoCode).toBe('');
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).not.toHaveProperty('friendCode');

        User.findById(res.body._id, (_, user) => {
          expect(user.name).toBe(userData.name);
          expect(user.island).toBe(userData.island);
          expect(user.friendCode).toBe(userData.friendCode);
          done();
        }).catch((error) => done(error));
      });
    });

    it('Rejects attempts without valid invite code', (done) => {
      const userData = DataFactory.user({ inviteCode: 'not_the_invite_code' });
      UserHelper.signUp(app, userData).then((res) => {
        expect(res.status).toBe(401);
        done();
      });
    });

    it('Requires a valid friend code', (done) => {
      const userData = DataFactory.user({ friendCode: 'not a friend code' });
      const expectedError = 'invalid friend code';
      UserHelper.signUp(app, userData).then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toBe(expectedError);
        done();
      });
    });

    it('converts lowercase friendCodes to upper case', (done) => {
      const userData = DataFactory.user({ friendCode: 'sw-1234-1234-1234' });
      UserHelper.signUp(app, userData).then((res) => {
        expect(res.status).toBe(201);
        User.findById(res.body._id, (_, user) => {
          expect(user.friendCode).toBe('SW-1234-1234-1234');
          done();
        }).catch((error) => done(error));
      });
    });

    it('removes whitespace from beginning and end of island and name', (done) => {
      const userData = DataFactory.user({
        name: ' testName ',
        island: ' testIsland ',
      });
      UserHelper.signUp(app, userData).then((res) => {
        expect(res.status).toBe(201);
        User.findById(res.body._id, (_, user) => {
          expect(user.name).toBe('testName');
          expect(user.island).toBe('testIsland');
          done();
        }).catch((error) => done(error));
      });
    });

    it('Requires a unique friend code', (done) => {
      const userData1 = DataFactory.user({ friendCode: 'SW-1234-1234-1234' });
      const userData2 = DataFactory.user({ friendCode: 'SW-1234-1234-1234' });
      const ecpectedError =
        'Error, expected `friendCode` to be unique. Value: `SW-1234-1234-1234`';
      UserHelper.signUp(app, userData1).then(() => {
        UserHelper.signUp(app, userData2).then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBe(ecpectedError);
          done();
        });
      });
    });
  });

  describe('GET /user', () => {
    it('/user/all returns all users', (done) => {
      const usersData = [
        DataFactory.user(),
        DataFactory.user(),
        DataFactory.user(),
      ];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        UserHelper.login(app, usersData[0]).then((res) => {
          const token = res.body.token;
          UserHelper.getUsers(app, token).then((res) => {
            usersData.forEach((userData) => {
              const user = res.body.find(
                (resUser) => resUser.name === userData.name
              );
              expect(user.name).toBe(userData.name);
              expect(user.island).toBe(userData.island);
              expect(user).not.toHaveProperty('password');
              done();
            });
          });
        });
      });
    });

    it('/user/all returns all users with populated prices', (done) => {
      const usersData = [
        DataFactory.user(),
        DataFactory.user(),
        DataFactory.user(),
      ];
      const priceData = { bells: 100, type: 'sell' };
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        UserHelper.login(app, usersData[0]).then((loginRes) => {
          const token = loginRes.body.token;
          PriceHelper.postPrice(app, priceData, token).then((priceRes) => {
            const price = priceRes.body;
            UserHelper.getUsers(app, token).then((getRes) => {
              const users = getRes.body;
              const userPrices = users.find(user => user.name === usersData[0].name).prices.toString();
              expect(userPrices).toContain([price])
              users.forEach(user => {
                user.prices.forEach(price => {
                  expect(price.user.toString()).toBe(user._id);
                })
              })
              done();
            });
          });
        });
      });
    });

    it('/user/:id returns single user', (done) => {
      const usersData = [
        DataFactory.user(),
        DataFactory.user(),
        DataFactory.user(),
      ];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        UserHelper.login(app, usersData[0]).then((res) => {
          const token = res.body.token;
          User.find({}, (_, users) => users).then((users) => {
            UserHelper.getUsers(app, token, users[0]._id).then((res) => {
              expect(res.body.name).toBe(users[0].name);
              expect(res.body.island).toBe(users[0].island);
              expect(res.body).not.toHaveProperty('password');
              done();
            });
          });
        });
      });
    });

    it('/user/:id returns populated prices on user document', (done) => {
      const userData = DataFactory.user();
      UserHelper.signUp(app, userData).then((userRes) => {
        const user = userRes.body;
        UserHelper.login(app, userData).then((loginRes) => {
          const token = loginRes.body.token;
          const priceData = { bells: 100, type: 'sell' };
          PriceHelper.postPrice(app, priceData, token).then((priceRes) => {
            const price = priceRes.body;
            UserHelper.getUsers(app, token, user._id).then((getRes) => {
              console.log(typeof getRes.body.prices, typeof [price]);
              expect(getRes.body.prices.toString()).toContain([price]);
              done();
            });
          });
        });
      });
    });

    it('/user/all requires a valid token', (done) => {
      const usersData = [
        DataFactory.user(),
        DataFactory.user(),
        DataFactory.user(),
      ];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        const token = 'not-a-token';
        UserHelper.getUsers(app, token).then((res) => {
          expect(res.status).toBe(401);
          done();
        });
      });
    });
  });

  describe('PATCH /user', () => {
    it('updates user dodoCode', (done) => {
      const userData = DataFactory.user();
      UserHelper.signUp(app, userData).then(() => {
        UserHelper.login(app, userData).then((authRes) => {
          const token = authRes.body.token;
          UserHelper.updateUser(app, token, { dodoCode: 'new dodo code' }).then(
            (res) => {
              expect(res.status).toBe(200);
              expect(res.body.dodoCode).toBe('new dodo code');
              expect(res.body).not.toHaveProperty('password');
              expect(res.body).not.toHaveProperty('friendCode');
              done();
            }
          );
        });
      });
    });

    it('requires authorisation', (done) => {
      const userData = DataFactory.user();
      UserHelper.signUp(app, userData).then(() => {
        const token = 'not the token';
        UserHelper.updateUser(app, token, { dodoCode: 'new dodo code' }).then(
          (res) => {
            expect(res.status).toBe(401);
            done();
          }
        );
      });
    });
  });
});
