import React from 'react';
import SubmitPrice from './submit-price';
import { Box, Heading } from 'rebass';

const MissingPrices = (props) => (
 <Box my={3} >
   <Heading>Missing Prices</Heading>
   {props.MissingPrices.map(missingPrice => <SubmitPrice key={missingPrice.date + missingPrice.period} date={missingPrice.date} period={missingPrice.period} />)}
 </Box>
);

export default MissingPrices
