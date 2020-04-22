import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
} from './filter-helpers';
import { format } from 'date-fns';
import { possiblePatterns, patternReducer } from './pattern';

const chartData = (user) => {
  const data = [['Period', 'Bells', 'Min', 'Max']];
  const thisWeeksPrices = filterThisWeeksPrices(user.prices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);
  const analysis = [thisWeeksPurchasePrice.bells];

  thisWeeksSellPrices.forEach(price => analysis.push(price.bells))

  const patterns = possiblePatterns(analysis);
  const minMaxPattern = patternReducer(patterns);

  const dates = [ 'Mon Am', 'Mon PM', 'Tue Am', 'Tue PM', 'Wed Am', 'Wed PM', 'Thu Am', 'Thu PM', 'Fri Am', 'Fri PM', 'Sat Am', 'Sat PM',  ]

  for (let i = 1; i < minMaxPattern.length; i += 1) {
    const price = thisWeeksSellPrices[i] ? thisWeeksSellPrices[i].bells : null
    const date = dates[i];
    data.push([date, price, minMaxPattern[i][0], minMaxPattern[i][1]]);
  }

  return {
    baseline: thisWeeksPurchasePrice,
    prices: data,
  }
}

export default chartData;
