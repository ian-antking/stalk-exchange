import React from 'react';
import {
  Flex,
  Button,
  Heading,
} from 'rebass';
import SubmitPrice from './submit-price';
import BestPriceCard from './best-price-card';
import PriceList from './price-list';
import { currentPeriod } from '../utils/date-helpers';
import { isSunday } from 'date-fns';

const Dashboard = (props) => {
  const userPrice = props.prices && props.prices.filter(price => price.user._id === props.user._id);

  const loading = <Heading my={3}>Loading...</Heading>;

  const prices = (
    <React.Fragment>
      <BestPriceCard bestPrice={props.bestPrice} />
      <PriceList prices={props.prices} users={props.users}/>
    <Button onClick={() => props.refreshPrices()}>Refresh</Button>
  </React.Fragment>
  )

  const submit = !isSunday(Date.now()) && currentPeriod(Date.now() === 'AM') ?  (
    <SubmitPrice
    setMessage={props.setMessage}
    getPrices={props.refreshPrices}
  />
  ) : <Heading>The Stalk Exchange is closed until tomorrow!</Heading>

  const pricesReady = userPrice && userPrice.length;

  const display = pricesReady ? prices : submit;

  return (
  <Flex
    alignItems='center'
    flexDirection='column'
    my={3}
  >
    { props.working ? loading : display}
  </Flex>
)}

export default Dashboard;
