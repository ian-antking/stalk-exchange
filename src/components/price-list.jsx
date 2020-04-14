import React from 'react';
import { Card, Text } from 'rebass';
import PriceCard from './price-card';
import { isSunday } from 'date-fns';

const PriceList = props => {
  const activeUsers = props.prices.sort((a, b) => a.bells - b.bells);

  !isSunday(Date.now()) && activeUsers.reverse();

  return (
    <Card width='90%'>
      {activeUsers.map((price, index) => (
        <PriceCard key={price._id} index={index} price={price} />
      ))}
      <Text>
        {`${activeUsers.length}/${props.users.length} users submitted`}
      </Text>
    </Card>
  );
};

export default PriceList;
