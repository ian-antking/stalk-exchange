import { sameDay, samePeriod } from './date-helpers';

const filterTodayPrices = (prices = []) => {
  const filteredPrices = prices.filter(price => {
    return sameDay(price.date, Date.now());
  })
  return [...new Set(filteredPrices)]
}

const filterCurrentPrices = (prices = []) => {
  const todayPrices = filterTodayPrices(prices)
  return todayPrices.filter(price => {
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
  filterCurrentPrices,
  lowestPrice,
  highestPrice,
}