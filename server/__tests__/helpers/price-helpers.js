const request = require('supertest');

exports.postPrice = (app, data, token) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post(`/price/${data.type}`)
      .set('Authorization', token)
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
}

exports.getPrices = (app, token, type) => {
  const url = type ? `/price?type=${type}` : '/price'
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
