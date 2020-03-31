import { sameDay } from './date-helpers';

const filterTodayPrices = (prices) => {
  return prices.filter(price => {
    return sameDay(price.date, Date.now());
  })
}

export {
  filterTodayPrices,
}