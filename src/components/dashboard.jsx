import React from 'react';
import {
  Flex,
} from 'rebass';
import SubmitPrice from './submit-price';
import BestPriceCard from './best-price-card';
import PriceList from './price-list'

const Dashboard = (props) => {
  const userPrice = props.prices && props.prices.filter(price => price.user._id === props.user._id);
  return (
  <Flex
    alignItems='center'
    flexDirection='column'
    my={3}
  >
    { userPrice && userPrice.length ? (
      <React.Fragment>
        <BestPriceCard bestPrice={props.bestPrice} />
        {props.users && <PriceList users={props.users}/>}
      </React.Fragment>
    ) : (

      <SubmitPrice
        setMessage={props.setMessage}
        getPrices={props.getPrices}
      />
    ) }
  </Flex>
)}

export default Dashboard;
