import React from 'react';
import { Flex, Text, Link } from 'rebass';

const Nav = props => {
  return (
    <Flex color="white" bg="black" alignItems="center">
      <Text fontWeight="bold">
        Stalk Exchange
      </Text>
      {!props.isLoggedIn && (
        <React.Fragment>
          <Link variant="nav" href="/">
            sign-up
          </Link>
          <Link variant="nav" href="login">
            log-in
          </Link>
        </React.Fragment>
      )}
    </Flex>
  );
};

export default Nav;
