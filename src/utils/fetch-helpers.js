import { isSunday } from 'date-fns';
import apiString from './api-string';
import TokenManager from './token-manager';

const _buildAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': TokenManager.getToken(),
});


const getPrices = async () => {
  const action = isSunday(Date.now()) ? 'buy' : 'sell';
  const url = `${apiString}/price?type=${action}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: _buildAuthHeaders(),
  })

  return response.json();
}

const getUsers = async () => {
  const url =  `${apiString}/user/all`
  const response = await fetch(url, {
    method: 'GET',
    headers: _buildAuthHeaders(),
  });
  return response.json();
}

const postPrice = async (body) => {
  const action = isSunday(Date.now()) ? 'buy' : 'sell';
  const response = await fetch(`${apiString}/price/${action}`, {
    method: 'POST',
    headers: _buildAuthHeaders(),
    body,
  })
  return response;
}

const login = async (body) => {
  const response = await fetch(`${apiString}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  return response;
}

export {
  getPrices,
  getUsers,
  postPrice,
  login,
}
