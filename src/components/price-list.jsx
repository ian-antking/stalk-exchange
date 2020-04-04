import React from 'react';
import { Box, Text } from 'rebass';
import PriceCard from './price-card';

const PriceList = (props) => {
  const activeUsers = props.prices
    .sort((a, b) => a.bells - b.bells)
    .reverse();

  return (
  <Box my={3} width='90%'>
    {
      activeUsers.map((price, index) => (
        <PriceCard
          key={price._id}
          price={price}
          rank={index + 1}
        />
      ))
    }
    {props.users && <Text my={3}>{`${activeUsers.length}/${props.users.length} users submitted`}</Text>}
  </Box>
)}

export default PriceList