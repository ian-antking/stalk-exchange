import React from 'react';
import { Card, Box } from 'rebass';

const PriceCard = props => (
  <Card>
    <Box
      sx={{
        display: 'grid',
        gridGap: 1,
        gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 1fr))',
      }}
    >
      <div>{props.price.user.name}</div>
      <div>{props.price.bells}</div>
      <div>{props.price.user.friendCode}</div>
    </Box>
  </Card>
);

export default PriceCard;
