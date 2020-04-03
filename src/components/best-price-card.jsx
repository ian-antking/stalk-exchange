import React from 'react';
import { Card, Heading, Text } from 'rebass';

const BestPriceCard = (props) => (
  <Card width='90%'>
    <Heading>Current Best Price:</Heading>
    <Text my={2} fontSize={20}>{`${props.bestPrice.bells} bells`}</Text>
    <Text>{`On ${props.bestPrice.user.name}'s Island: ${props.bestPrice.user.island}`}</Text>
    <Text>{`${props.bestPrice.user.friendCode}`}</Text>
  </Card>
)

export default BestPriceCard
