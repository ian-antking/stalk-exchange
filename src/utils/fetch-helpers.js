import { isSunday } from './date-helpers';
import apiString from './api-string';
import TokenManager from './token-manager';

const _buildAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': TokenManager.getToken(),
});

const getPrices = async () => {
  const action = isSunday() ? 'buy' : 'sell';
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

export {
  getPrices,
  getUsers,
}
