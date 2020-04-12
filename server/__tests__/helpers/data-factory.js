const faker = require('faker');

const randomDigit = () => {
  const digits = '123456890'.split('');
  return digits[Math.floor(Math.random() * digits.length)];
}

const randomFourDigits = () => {
  const fourDigits = [];
  for (let i = 0; i < 4; i += 1) {
    fourDigits.push(randomDigit())
  }
  return fourDigits.join('');
}

const generateFriendCode = () => {
  return `SW-${randomFourDigits()}-${randomFourDigits()}-${randomFourDigits()}`
}

exports.user = (options = {}) => ({
  name: options.name || faker.name.findName(),
  island: options.name || faker.name.firstName(),
  password: options.password || faker.internet.password(),
  friendCode: options.friendCode || generateFriendCode(),
  inviteCode: options.inviteCode || 'invite',
});