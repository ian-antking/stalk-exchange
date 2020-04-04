import React from 'react';
import { Card, Flex } from 'rebass';

const PriceCard = (props) => (
  <Card>
    <Flex
      justifyContent='space-between'
    >
      <span>{`${props.rank}:`}</span>
      <span>{props.price.bells}</span>
      <span>{props.price.user.name}</span>
      <span>{props.price.user.friendCode}</span>
    </Flex>
  </Card>
)

export default PriceCard