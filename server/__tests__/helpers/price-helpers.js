const request = require('supertest');

exports.postPrice = (app, data, token) => 
new Promise((resolve, reject) => {
  request(app)
    .post(`/price/${data.type}`)
    .set('Authorizer', token)
    .send({
      bells: data.bells,
      date: data.date || null,
    })
    .end((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
});