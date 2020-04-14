import React from 'react';
import { Text, Box } from 'rebass';

const Message = props => {
  const { message } = props;
  return (
    <Box
      width="100%"
      color="white"
      backgroundColor={message.error ? 'error' : 'confirm'}
      py={1}
    >
      <Text>{message.text}</Text>
    </Box>
  );
};

export default Message;
