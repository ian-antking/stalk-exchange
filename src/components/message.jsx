import React from 'react';
import { Text, Box } from 'rebass';

const Message = props => {
  const { message } = props;
  return (
    <Box
      width="100%"
      height='50px'
      color="white"
      display='flex'
      alignItems='center'
      justifyContent='center'
      bg={message.error ? 'error' : 'confirm'}
      py={1}
    >
      <Text>{message.text}</Text>
    </Box>
  );
};

export default Message;
