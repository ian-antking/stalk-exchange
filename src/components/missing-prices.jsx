import React from 'react'
import SubmitPrice from './submit-price'
import { Box, Heading } from 'rebass'

const MissingPrices = (props) => (
  <Box my={3}>
    <Heading>Missing Prices</Heading>
    {props.MissingPrices.map((missingPrice) => (
      <SubmitPrice
        setMessage={props.setMessage}
        key={missingPrice.date + missingPrice.period}
        date={missingPrice.periodDate}
        period={missingPrice.period}
        refreshPrices={props.refreshPrices}
      />
    ))}
  </Box>
)

export default MissingPrices
