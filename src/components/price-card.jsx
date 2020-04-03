import React from 'react';
import { Card, Text } from 'rebass';

const PriceCard = (props) => (
  <Card >
    <Text>{`${props.rank}: ${props.user.latestPrice.bells} | ${props.user.name} | ${props.user.friendCode}`}</Text>
  </Card>
)

export default PriceCard