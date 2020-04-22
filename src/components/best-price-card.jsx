import React from 'react';
import { Box, Heading, Text, Image } from 'rebass';
import bells from '../images/bells.svg';
import { filterCurrentPrices } from '../utils/filter-helpers';

const BestPriceCard = (props) => {
  const { user } = props;

  const price = filterCurrentPrices(user.prices);
  return (
    <Box my={3}>
      <Heading>Current Best Price:</Heading>
      <Box display="flex" width="100%" justifyContent="center" my={3}>
        <Text fontSize={4}>{price.bells}</Text>
        <Image mx={1} src={bells} alt="bells" />
      </Box>
      <Text>{`On ${user.name}'s Island: ${user.island}`}</Text>
      <Text>{`${user.dodoCode || ''}`}</Text>
    </Box>
  );
};

export default BestPriceCard;
