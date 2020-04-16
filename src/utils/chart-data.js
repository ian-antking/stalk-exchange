import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
  filterUserPrices,
} from './filter-helpers';
import { format } from 'date-fns';

const chartData = (prices, user) => {
  const data = [['Period', 'Bells']];
  const userPrices = filterUserPrices(prices, user);
  const thisWeeksPrices = filterThisWeeksPrices(userPrices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);
  thisWeeksSellPrices.forEach((price) => {
    const date = format(price.date, 'E a');
    data.push([date, price.bells]);
  });

  return {
    baseline: thisWeeksPurchasePrice,
    prices: data,
  }
}

export default chartData;
