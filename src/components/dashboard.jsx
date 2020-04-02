import React from 'react';
import {
  Box,
  Heading,
  Text,
} from 'rebass';
import SubmitPrice from './submit-price'

const Dashboard = (props) => {
  const userPrice = props.prices && props.prices.filter(price => price.user === props.user).length;
  return (
  <Box>
    <Heading my={3}>Dashboard</Heading>
    {props.bestPrice ? (
      <Text my={3}>{
        `The current best ${props.bestPrice.type} price is ${props.bestPrice.bells}, on ${props.bestPrice.user.name}'s island ${props.bestPrice.user.island}. ${props.bestPrice.user.friendCode}`
        }</Text>)
      : (
        'No current prices submitted yet'
      )}
    { userPrice ? <Text my={3}>Current price submitted</Text> : (
      <SubmitPrice
        setMessage={props.setMessage}
        getPrices={props.getPrices}
      />
    ) }
  </Box>
)}

export default Dashboard;
