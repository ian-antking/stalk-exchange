const mongoose = require('mongoose');
const app = require('../src/app');
  
const User = require('../src/models/user');
const UserHelper = require('./helpers/user-helpers');

describe('/user', () => {
  let data;

  beforeAll(done => {
    const url = process.env.DATABASE_CONN;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });

  beforeEach(() => {
    data = {
      name: 'test-name',
      island: 'test-island',
      password: 'test-password',
      friendCode: 'test-friend-code',
      inviteCode: 'invite'
    }
  })

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
      UserHelper.signUp(app, data)
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
          })
      .catch(error => done(error));
      });
    });

    it('Rejects attempts without valid invite code', (done) => {
      data.inviteCode = 'not_the_invite_code';
      UserHelper.signUp(app, data)
      .then(res => {
        expect(res.status).toBe(401);
          done();
      })
    });
  });
});