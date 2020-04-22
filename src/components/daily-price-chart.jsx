import React from 'react';
import { format } from 'date-fns';
import { Chart } from 'react-google-charts';
import { Heading, Card } from 'rebass';
import chartOptions from '../utils/chart-options';
import chartData from '../utils/chart-data';

const DailyPriceChart = (props) => {
  const { user } = props;

  const data = user.prices.length && chartData(user)

  return (
    data ? (
      <Card>
        <Heading>{`${props.user.name}'s prices for week ${format(
          Date.now(),
          'w'
        )}`}</Heading>
        <Chart
          chartType="LineChart"
          data={data.prices}
          options={chartOptions(data.baseline ? data.baseline.bells : null)}
          width="100%"
          height="400px"
          legendToggle
        />
      </Card>
    ) : null
  );
};

export default DailyPriceChart;
