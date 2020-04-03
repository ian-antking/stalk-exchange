import React from 'react';
import { Box, Text } from 'rebass';
import { samePeriod } from '../utils/date-helpers'
import PriceCard from './price-card';

const PriceList = (props) => {
  const activeUsers = props.users
    .filter(user => user.latestPrice && samePeriod(user.latestPrice.date, Date.now()))
    .sort((a, b) => a.latestPrice.bells - b.latestPrice.bells)
    .reverse();

  return (
  <Box my={3} width='90%'>
    {
      activeUsers.map((user, index) => (
        <PriceCard
          key={user._id}
          user={user}
          rank={index + 1}
        />
      ))
    }
    <Text my={3}>{`${activeUsers.length}/${props.users.length} users submitted`}</Text>
  </Box>
)}

export default PriceList