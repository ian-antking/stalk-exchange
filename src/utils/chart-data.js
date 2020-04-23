import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
} from './filter-helpers';
import { possiblePatterns, patternReducer } from './pattern';
import { format } from 'date-fns';

const chartData = (user) => {
  const data = [['Period', 'Bells', 'Min', 'Max']];
  const thisWeeksPrices = filterThisWeeksPrices(user.prices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);

  if (!thisWeeksPrices.length) return null;

  const analysis = [thisWeeksPurchasePrice?.bells || null];

  thisWeeksSellPrices.forEach(price => analysis.push(price.bells))

  const patterns = possiblePatterns(analysis);
  const minMaxPattern = patternReducer(patterns);

  const dates = ['Mon am', 'Mon pm', 'Tue am', 'Tue pm', 'Wed am', 'Wed pm', 'Thu am', 'Thu pm', 'Fri am', 'Fri pm', 'Sat am', 'Sat pm',]

  dates.forEach((date, index) => {
    const priceObject = thisWeeksSellPrices.find(price => format(price.date, 'E a').toLowerCase() === date.toLowerCase());
    const price = priceObject?.bells || null;
    data.push([date, price, minMaxPattern[index][0], minMaxPattern[index][1]]);
  })

  return {
    baseline: thisWeeksPurchasePrice,
    prices: data,
  }
}

export default chartData;
