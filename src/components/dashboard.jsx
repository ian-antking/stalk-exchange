import React from 'react';
import { Flex, Button, Heading } from 'rebass';
import SubmitPrice from './submit-price';
import BestPriceCard from './best-price-card';
import PriceList from './price-list';
import { currentPeriod } from '../utils/date-helpers';
import { isSunday } from 'date-fns';
import { filterCurrentPrices } from '../utils/filter-helpers';
import DailyPriceChart from './daily-price-chart';
import DodoUpdater from './dodo-updater';

const Dashboard = (props) => {
  const currentPrices = props.prices && filterCurrentPrices(props.prices);
  const userPrice =
    currentPrices &&
    currentPrices.find((price) => price.user._id === props.user._id);

  const loading = <Heading my={3}>Loading...</Heading>;

  const prices = (
    <React.Fragment>
      <BestPriceCard prices={currentPrices} />
      <PriceList prices={currentPrices} users={props.users} />
      <Button my={3} onClick={() => props.refreshPrices()}>
        Refresh
      </Button>
      <DodoUpdater
        updateUser={props.updateUser}
        user={props.user}
        users={props.users}
        setMessage={props.setMessage}
      />
    </React.Fragment>
  );

  const submit =
    isSunday(Date.now()) && currentPeriod(Date.now()) === 'PM' ? (
      <Heading>The Stalk Exchange is closed until tomorrow!</Heading>
    ) : (
      <SubmitPrice
        setMessage={props.setMessage}
        getPrices={props.refreshPrices}
      />
    );

  const display = userPrice ? prices : submit;

  return (
    <Flex alignItems="center" flexDirection="column" my={3}>
      {props.working ? loading : display}
      {currentPrices && (
        <DailyPriceChart user={props.user} prices={props.prices} />
      )}
    </Flex>
  );
};

export default Dashboard;
