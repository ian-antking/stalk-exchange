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

exports.getPrices = (app, token, type) => 
  new Promise((resolve, reject) => {
    request(app)
      .get(`/price/${type || ''}`)
      .set('Authorizer', token)
      .send()
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  })

exports.manyPrices = (app, prices, token) => {
  return prices.map(data => {
    return new Promise((resolve, reject) => {
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
  })
})};
