import React from 'react';
import { Box, Card, Heading, Text, Image } from 'rebass';
import { isSunday } from 'date-fns';
import { lowestPrice, highestPrice } from '../utils/filter-helpers';
import bells from '../images/bells.svg'

const BestPriceCard = props => {
  const bestPrice = isSunday(Date.now()) ? lowestPrice(props.prices) : highestPrice(props.prices);
  return (
    <Card>
      <Heading>Current Best Price:</Heading>
      <Box
        display='flex'
        width='100%'
        justifyContent='center'
        my={3}
      >
        <Text fontSize={4}>{bestPrice.bells}</Text>
        <Image mx={1} src={bells} alt='bells'/>
      </Box>
      <Text>{`On ${bestPrice.user.name}'s Island: ${bestPrice.user.island}`}</Text>
      <Text>{`${bestPrice.user.dodoCode || ''}`}</Text>
    </Card>
  );
};

export default BestPriceCard;
