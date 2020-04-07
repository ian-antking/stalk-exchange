import React from 'react';
import { Chart } from 'react-google-charts';
import { format } from 'date-fns';
import {
  filterThisWeeksPrices,
  filterUserPrices,
} from '../utils/filter-helpers';
import { Heading } from 'rebass';

const options = {
  hAxis: { title: 'Period' },
  vAxis: { title: 'Bells' },
  legend: 'none',
};

const DailyPriceChart = props => {
  const data = [['Period', 'Bells']];
  const userPrices = filterUserPrices(props.prices, props.user);
  const thisWeeksPrices = filterThisWeeksPrices(userPrices);
  thisWeeksPrices.forEach(price => {
    const date = format(price.date, 'E a');
    data.push([date, price.bells]);
  });
  return (
    <React.Fragment>
      <Heading my={3}>{`Week ${format(Date.now(), 'w')} Prices`}</Heading>
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
