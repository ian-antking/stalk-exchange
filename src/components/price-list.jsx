import React from 'react';
import { Card, Text, Button } from 'rebass';
import PriceCard from './price-card';
import { isSunday } from 'date-fns';

const PriceList = props => {
  const activeUsers = props.prices.sort((a, b) => a.bells - b.bells);

  !isSunday(Date.now()) && activeUsers.reverse();

  return (
    <Card>
      {activeUsers.map((price, index) => (
        <PriceCard key={price._id} index={index} price={price} />
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
