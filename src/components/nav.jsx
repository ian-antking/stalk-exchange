import React from 'react';
import { Flex, Text, Box, Link } from 'rebass';
import { useLocation } from 'react-router-dom';

const Nav = props => {
  const location = useLocation()
  const { user } = props

  const profileLink = props.isLoggedIn && <Link href={`/user?id=${user?._id}`} variant='nav'>{user?.name}</Link>
  const dashboardLink = props.isLoggedIn && <Link href={`/dashboard`} variant='nav'>dashboard</Link>

  return (
    <Flex variant='navbar'>
      <Text fontWeight="bold">
        Stalk Exchange
      </Text>
      {location.pathname === '/dashboard' ? profileLink : dashboardLink}
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
