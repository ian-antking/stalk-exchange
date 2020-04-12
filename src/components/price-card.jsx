import React from 'react';
import { Card, Box } from 'rebass';

const PriceCard = props => {
  const { price, price: {user} } = props;
  return (
  <Card>
    <Box
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
  </Card>
)};

export default PriceCard;
