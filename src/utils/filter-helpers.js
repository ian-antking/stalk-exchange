import { sameDay, samePeriod } from './date-helpers';

const filterTodayPrices = (prices) => {
  return prices.filter(price => {
    return sameDay(price.date, Date.now());
  })
}

const filterPeriodPrices = (prices) => {
  return prices.filter(price => {
    return samePeriod(price.date, Date.now());
  })
}

export {
  filterTodayPrices,
  filterPeriodPrices,
}