import React from 'react';
import { Box, Text } from 'rebass';
import PriceCard from './price-card';
import { isSunday } from 'date-fns';

const PriceList = props => {
  const activeUsers = props.prices.sort((a, b) => a.bells - b.bells);

  !isSunday(Date.now()) && activeUsers.reverse();

  return (
    <Box width="90%">
      {activeUsers.map(price => (
        <PriceCard key={price._id} price={price} />
      ))}
      <Text>
        {`${activeUsers.length}/${props.users.length} users submitted`}
      </Text>
    </Box>
  );
};

export default PriceList;
