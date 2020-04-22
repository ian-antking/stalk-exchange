import React from 'react';
import { Card, Text, Button } from 'rebass';
import PriceCard from './price-card';
import { isSunday } from 'date-fns';
import { filterCurrentPrices } from '../utils/filter-helpers';
import BestPriceCard from './best-price-card';

const PriceList = props => {
  const { users } = props;
  const activeUsers = users
    .filter(user => filterCurrentPrices(user.prices))
    .sort((a, b) => filterCurrentPrices(a.prices).bells - filterCurrentPrices(b.prices).bells);

  !isSunday(Date.now()) && activeUsers.reverse();

  return (
    <Card>
      {activeUsers && <BestPriceCard user={activeUsers[0]} />}
      {activeUsers.slice(1).map((user, index) => (
        <PriceCard key={user._id} index={index} user={user} />
      ))}
      <Text>
        {`${activeUsers.length}/${props.users.length} users submitted`}
      </Text>
      <Button onClick={() => props.refreshPrices()}>
        Refresh
      </Button>
    </Card>
  );
};

export default PriceList;
