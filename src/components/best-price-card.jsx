import React from 'react';
import { Card, Heading, Text } from 'rebass';
import { isSunday } from 'date-fns';
import { lowestPrice, highestPrice } from '../utils/filter-helpers';

const BestPriceCard = props => {
  const bestPrice = isSunday(Date.now()) ? lowestPrice(props.prices) : highestPrice(props.prices);
  return (
    <Card width="90%">
      <Heading>Current Best Price:</Heading>
      <Text my={2} fontSize={20}>{`${bestPrice.bells} bells`}</Text>
      <Text>{`On ${bestPrice.user.name}'s Island: ${bestPrice.user.island}`}</Text>
      <Text>{`${bestPrice.user.friendCode}`}</Text>
    </Card>
  );
};

export default BestPriceCard;
