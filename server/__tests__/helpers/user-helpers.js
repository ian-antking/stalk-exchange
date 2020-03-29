const request = require('supertest');

exports.signUp = (app, data) => 
  new Promise((resolve, reject) => {
    request(app)
      .post('/user')
      .send(data)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });

exports.login = (app, data) =>
  new Promise((resolve, reject) => {
    request(app)
      .post('/auth/login')
      .send({
        name: data.name,
        island: data.island,
        password: data.password,
      })
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  })