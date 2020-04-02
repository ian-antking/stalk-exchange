import React from 'react';
import {
  Box,
  Heading,
  Text,
} from 'rebass';
import SubmitPrice from './submit-price'

const Dashboard = (props) => (
  <Box>
    <Heading>Dashboard</Heading>
    {console.log(props)}
    {props.bestPrice && <Text>{
      `The current best ${props.bestPrice.type} price is ${props.bestPrice.bells}, on ${props.bestPrice.user.name}'s island ${props.bestPrice.user.island}. ${props.bestPrice.user.friendCode}`
      }</Text>}
    <SubmitPrice
      setMessage={props.setMessage}
      getPrices={props.getPrices}
    />
  </Box>
)

export default Dashboard;
