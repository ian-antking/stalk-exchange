import React from 'react';
import { Flex, Heading } from 'rebass';
import SubmitPrice from './submit-price';
import PriceList from './price-list';
import { sameDay, samePeriod, currentPeriod } from '../utils/date-helpers';
import { isSunday } from 'date-fns';
import DailyPriceChart from './daily-price-chart';
import DodoUpdater from './dodo-updater';
import LoadingCard from './loading-card';

const Dashboard = (props) => {
  const { users, user, refreshPrices, working } = props;
  const currentPriceSubmitted =
    user &&
    user.prices.find(
      (price) =>
        sameDay(price.date, Date.now()) && samePeriod(price.date, Date.now())
    );

  const priceDisplay = currentPriceSubmitted ? (
    <PriceList users={users} refreshPrices={refreshPrices} />
  ) : (
    <SubmitPrice setMessage={props.setMessage} refreshPrices={props.refreshPrices} />
  );

  const dashBoard = (
    <Flex flexDirection="column">
      {priceDisplay}
      <DailyPriceChart user={user} users={users} />
      <DodoUpdater
        updateUser={props.updateUser}
        user={user}
        setMesage={props.setMesage}
      />
    </Flex>
  );

  const closedMessage = (
    <Heading>The Stalk Market is closed until tomorrow.</Heading>
  );

  const display =
    !isSunday(Date.now()) && currentPeriod(Date.now()) === 'AM'
      ? dashBoard
      : closedMessage;

  const render = users && !working ? display : <LoadingCard />;

  return render
};

export default Dashboard;
