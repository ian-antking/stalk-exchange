const faker = require('faker');

exports.user = (options = {}) => ({
  name: options.name || faker.name.findName(),
  island: options.name || faker.name.firstName(),
  password: options.password || faker.internet.password(),
  friendCode: options.password || faker.internet.password(),
  inviteCode: options.inviteCode || 'invite',
});