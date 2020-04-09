import { sameDay, samePeriod, sameWeek } from './date-helpers';
import { isSunday } from 'date-fns';

const filterTodayPrices = (prices) => {
  return prices.filter(price => {
    return sameDay(price.date, Date.now());
  })
}

const filterCurrentPrices = (prices) => {
  const todayPrices = filterTodayPrices(prices)
  return todayPrices.filter(price => {
    return samePeriod(price.date, Date.now());
  })
}
const filterThisWeeksPrices = (prices) => {
  return prices.filter(price => {
    return sameWeek(price.date, Date.now());
  })
}

const filterThisWeeksSellPrices = (prices) => {
  return prices.filter(price => {
    return sameWeek(price.date, Date.now()) && !isSunday(price.date);
  })
}

const findThisWeeksPurchasePrice = (prices) => {
  return prices.find(price => {
    return sameWeek(price.date, Date.now()) && isSunday(price.date);
  })
}

const filterUserPrices = (prices, user) => {
  return prices.filter(price => price.user._id === user._id)
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
  filterThisWeeksPrices,
  findThisWeeksPurchasePrice,
  filterThisWeeksSellPrices,
  filterUserPrices,
}