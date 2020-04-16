import React from 'react';
import { Chart } from 'react-google-charts';
import { format } from 'date-fns';
import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
  filterUserPrices,
} from '../utils/filter-helpers';
import { Heading, Card } from 'rebass';
import chartOptions from '../utils/chart-options';

const DailyPriceChart = (props) => {
  const data = [['Period', 'Bells']];
  const userPrices = filterUserPrices(props.prices, props.user);
  const thisWeeksPrices = filterThisWeeksPrices(userPrices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);
  thisWeeksSellPrices.forEach((price) => {
    const date = format(price.date, 'E a');
    data.push([date, price.bells]);
  });

  return (
    thisWeeksSellPrices.length > 0 && (
      <Card>
        <Heading>{`${props.user.name}'s prices for week ${format(
          Date.now(),
          'w'
        )}`}</Heading>
        <Chart
          chartType="LineChart"
          data={data}
          options={chartOptions(thisWeeksPurchasePrice.bells || null)}
          width="100%"
          height="400px"
          legendToggle
        />
      </Card>
    )
  );
};

export default DailyPriceChart;
