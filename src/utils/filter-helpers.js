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

const lowestPrice = (prices) => {
  return prices.reduce((previousPrice, currentPrice) => {
    return previousPrice.bells < currentPrice.bells ? previousPrice : currentPrice;
  })
}

const highestPrice = (prices) => {
  return prices.reduce((previousPrice, currentPrice) => {
    return previousPrice.bells > currentPrice.bells ? previousPrice : currentPrice;
  })
}

export {
  filterTodayPrices,
  filterPeriodPrices,
  lowestPrice,
  highestPrice,
}