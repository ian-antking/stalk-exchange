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

    it('Rejects attempts without valid invite code', done => {
      const userData = DataFactory.user({ inviteCode: 'not_the_invite_code' });
      UserHelper.signUp(app, userData)
      .then(res => {
        expect(res.status).toBe(401);
          done();
      })
    });

    xit('Requires a unique friend code', done => {
      const userData1 = DataFactory.user({ friendCode: 'duplicate-friend-code' });
      const userData2 = DataFactory.user({ friendCode: 'duplicate-friend-code' });
      UserHelper.signUp(app, userData1)
      .then(() => {
        UserHelper.signUp(app, userData2)
        .then(res => {
          expect(res.status).toBe(422);
            done();
        })
      })
    })
  });
  
  describe('GET /user', () => {
    it('/user/all returns all users', done => {
      const usersData = [DataFactory.user(), DataFactory.user(), DataFactory.user()];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        UserHelper.login(app, usersData[0]).then(res => {
          const token = res.body.token;
          UserHelper.getUsers(app, token).then(res => {
            usersData.forEach(userData => {
              const user = res.body.find(resUser => resUser.friendCode === userData.friendCode);
              expect(user.name).toBe(userData.name);
              expect(user.island).toBe(userData.island);
              expect(user).not.toHaveProperty('password');
              done();
            })
          })
        })
      })
    })

    it('/user/:id returns single user', done => {
      const usersData = [DataFactory.user(), DataFactory.user(), DataFactory.user()];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        UserHelper.login(app, usersData[0]).then(res => {
          const token = res.body.token;
          User.find({}, (_, users) => users).then((users) => {
            UserHelper.getUsers(app, token, users[0]._id).then(res => {
              expect(res.body.name).toBe(users[0].name);
              expect(res.body.island).toBe(users[0].island);
              expect(res.body).not.toHaveProperty('password');
              done();
            })
          }) 
        })
      })
    })
    
    it('/user/all requires a valid token', done => {
      const usersData = [DataFactory.user(), DataFactory.user(), DataFactory.user()];
      Promise.all(UserHelper.manyUsers(app, usersData)).then(() => {
        const token = 'not-a-token';
        UserHelper.getUsers(app, token).then(res => {
          expect(res.status).toBe(401);
          done();
        })
      })
    })
    
  })
});
