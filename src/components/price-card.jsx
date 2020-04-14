import React from 'react';
import { Box } from 'rebass';

const PriceCard = props => {
  const { price, price: {user} } = props;
  return (
  <Box
    py={2}
    backgroundColor={props.index % 2 === 0 ? 'muted' : 'gray'}
    sx={{
      display: 'grid',
      gridGap: 1,
      gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 1fr))',
    }}
  >
    <div>{price.user.name}</div>
    <div>{price.bells}</div>
    <div>{`${user.island}: ${user.dodoCode || 'Closed'}`}</div>
  </Box>
)};

export default PriceCard;
