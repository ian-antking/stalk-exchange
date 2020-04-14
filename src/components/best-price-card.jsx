import React from 'react';
import { Card, Heading, Text } from 'rebass';
import { isSunday } from 'date-fns';
import { lowestPrice, highestPrice } from '../utils/filter-helpers';

const BestPriceCard = props => {
  const bestPrice = isSunday(Date.now()) ? lowestPrice(props.prices) : highestPrice(props.prices);
  return (
    <Card>
      <Heading>Current Best Price:</Heading>
      <Text>{`${bestPrice.bells} bells`}</Text>
      <Text>{`On ${bestPrice.user.name}'s Island: ${bestPrice.user.island}`}</Text>
      <Text>{`${bestPrice.user.dodoCode || ''}`}</Text>
    </Card>
  );
};

export default BestPriceCard;
