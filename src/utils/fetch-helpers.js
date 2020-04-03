import { isSunday } from './date-helpers';
import apiString from './api-string';
import TokenManager from './token-manager';

const getPrices = async () => {
  const action = isSunday() ? 'buy' : 'sell';
  const url = `${apiString}/price?type=${action}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TokenManager.getToken(),
    }
  })

  return response.json();
}

export {
  getPrices,
}
