import React from 'react';
import { Card, Text } from 'rebass';

const PriceCard = (props) => (
  <Card >
    <Text>{`${props.rank}: ${props.price.bells} | ${props.price.user.name} | ${props.price.user.friendCode}`}</Text>
  </Card>
)

export default PriceCard