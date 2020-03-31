import React from 'react';
import {
  Flex,
  Text,
  Box,
  Link,
} from 'rebass';

const Nav = (props) => {
  return (
    <Flex
    px={2}
    color='white'
    bg='black'
    alignItems='center'>
    <Text p={2} fontWeight='bold'>Stalk Market</Text>
    <Box mx='auto' />
    { !props.isLoggedIn && (
      <React.Fragment>
        <Link variant='nav' href='/'>
          sign-up
        </Link>
        <Link variant='nav' href='login'>
          log-in
        </Link>
      </React.Fragment>
    ) }
  </Flex>
  );
}

export default Nav;
