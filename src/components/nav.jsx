import React from 'react';
import {
  Flex,
  Text,
  Box,
  Link,
} from 'rebass';

const Nav = () => (
  <Flex
  px={2}
  color='white'
  bg='black'
  alignItems='center'>
  <Text p={2} fontWeight='bold'>Stalk Market</Text>
  <Box mx='auto' />
  <Link variant='nav' href='/signup'>
    sign-up
  </Link>
  <Link variant='nav' href='login'>
    log-in
  </Link>
</Flex>
);

export default Nav;
