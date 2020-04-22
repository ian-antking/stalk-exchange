import React from 'react';
import { Box } from 'rebass';
import { filterCurrentPrices } from '../utils/filter-helpers';

const PriceCard = (props) => {
  const { user } = props;
  const currentPrice = filterCurrentPrices(user.prices);
  return currentPrice ? (
    <Box
      py={2}
      backgroundColor={props.index % 2 === 0 ? 'inherit' : 'gray'}
      sx={{
        display: 'grid',
        gridGap: 1,
        gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 1fr))',
      }}
    >
      <div>{user.name}</div>
      <div>{currentPrice.bells}</div>
      <div>{`${user.island}: ${user.dodoCode || 'Closed'}`}</div>
    </Box>
  ) : null;
};

export default PriceCard;
