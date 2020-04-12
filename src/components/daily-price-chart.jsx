import React from 'react';
import { Chart } from 'react-google-charts';
import { format } from 'date-fns';
import {
  filterThisWeeksPrices,
  filterThisWeeksSellPrices,
  findThisWeeksPurchasePrice,
  filterUserPrices,
} from '../utils/filter-helpers';
import { Heading } from 'rebass';

const DailyPriceChart = props => {
  const data = [['Period', 'Bells']];
  const userPrices = filterUserPrices(props.prices, props.user);
  const thisWeeksPrices = filterThisWeeksPrices(userPrices);
  const thisWeeksSellPrices = filterThisWeeksSellPrices(thisWeeksPrices);
  const thisWeeksPurchasePrice = findThisWeeksPurchasePrice(thisWeeksPrices);
  thisWeeksSellPrices.forEach(price => {
    const date = format(price.date, 'E a');
    data.push([date, price.bells]);
  });

  const baseline = thisWeeksPurchasePrice ? thisWeeksPurchasePrice.bells : null

  const options = {
    vAxis: {baseline, baselineColor: 'red' },
    legend: 'none',
    chartArea: {
      backgroundColor: "transparent",
      width: '80%',
      height: '80%',
      marginTop: '10%',
    }
  };

  return data.length > 1 && (
    <React.Fragment>
      <Heading mt={3}>{`${props.user.name}'s prices for week ${format(Date.now(), 'w')}`}</Heading>
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    </React.Fragment>
  );
};

export default DailyPriceChart;
