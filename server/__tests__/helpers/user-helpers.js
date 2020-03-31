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

exports.manyUsers = (app, data) => {
  return data.map(user => {
    return new Promise((resolve, reject) => {
      request(app)
      .post('/user')
      .send(user)
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  });
}

exports.getUsers = (app, token, id = 'all') => {
  const url = `/user/${id}`
  return new Promise((resolve, reject) => {
    request(app)
      .get(url)
      .set('Authorization', token)
      .send()
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  })
}

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