import React from 'react';
import { Flex, Text, Box, Link } from 'rebass';

const Nav = props => {
  return (
    <Flex variant='navbar'>
      <Text fontWeight="bold">
        Stalk Exchange
      </Text>
      {props.user && <Text>{props.user.name}</Text>}
      {!props.isLoggedIn && (
        <Box>
          <Link variant="nav" href="/sign-up">
            sign-up
          </Link>
          <Link variant="nav" href="/">
            log-in
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Nav;
