import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
} from './filter-helpers';
import { format } from 'date-fns';

const chartData = (user) => {
  const data = [['Period', 'Bells']];
  const thisWeeksPrices = filterThisWeeksPrices(user.prices);
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
