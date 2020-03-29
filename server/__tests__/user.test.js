const mongoose = require('mongoose');
const app = require('../src/app');
  
const User = require('../src/models/user');
const UserHelper = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory');

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
      const userData = DataFactory.user();
      UserHelper.signUp(app, userData)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe(userData.name);
          expect(res.body.island).toBe(userData.island);
          expect(res.body.friendCode).toBe(userData.friendCode);
          expect(res.body).not.toHaveProperty('password');

          User.findById(res.body._id, (_, user) => {
            expect(user.name).toBe(userData.name);
            expect(user.island).toBe(userData.island)
            expect(user.friendCode).toBe(userData.friendCode);
            done();
          })
      .catch(error => done(error));
      });
    });

    it('Rejects attempts without valid invite code', (done) => {
      const userData = DataFactory.user({ inviteCode: 'not_the_invite_code' });
      UserHelper.signUp(app, userData)
      .then(res => {
        expect(res.status).toBe(401);
          done();
      })
    });
  });
});