import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
} from './filter-helpers';
import { possiblePatterns, patternReducer } from './pattern';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  getTime,
} from 'date-fns';

const chartData = (user) => {
  const data = [['Period', 'Bells', 'Min', 'Max']];
  const missing = [];
  const thisWeeksPrices = filterThisWeeksPrices(user.prices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);

  if (!thisWeeksPrices.length) return null;

  const analysis = [thisWeeksPurchasePrice?.bells || null];

  thisWeeksSellPrices.forEach((price) => analysis.push(price.bells));

  const patterns = possiblePatterns(analysis);
  const minMaxPattern = patternReducer(patterns);

  const periods = [
    'Mon am',
    'Mon pm',
    'Tue am',
    'Tue pm',
    'Wed am',
    'Wed pm',
    'Thu am',
    'Thu pm',
    'Fri am',
    'Fri pm',
    'Sat am',
    'Sat pm',
  ];

  const datesOfWeek = eachDayOfInterval({
    start: startOfWeek(Date.now()),
    end: endOfWeek(Date.now()),
  });

  periods.forEach((period, index) => {
    const priceObject = thisWeeksSellPrices.find(
      (price) =>
        format(price.date, 'E a').toLowerCase() === period.toLowerCase()
    );
    const price = priceObject?.bells || null;
    data.push([
      period,
      price,
      minMaxPattern[index][0],
      minMaxPattern[index][1],
    ]);
    const date = datesOfWeek.find(
      (dateOfWeek) => format(dateOfWeek, 'E') === period.split(' ')[0]
    );
    const periodDate = getTime(
      period.split(' ')[1] === 'am' ? startOfDay(date) : endOfDay(date)
    );
    if (!price && periodDate < Date.now()) missing.push({ period, periodDate });
  });

  if (!thisWeeksPurchasePrice) {
    missing.unshift({
      period: 'Sun am',
      periodDate: getTime(
        datesOfWeek.find((date) => format(date, 'E') === 'Sun')
      ),
    });
  }

  return {
    baseline: thisWeeksPurchasePrice,
    prices: data,
    missing,
  };
};

export default chartData;
