import React from 'react';
import {
  Text,
  Box,
} from 'rebass';

const Message = (props) => {
  const { message } = props;
  return (
    <Box
      width='100%'
      color='white'
      backgroundColor={ message.error ? 'red' : 'green' }
      py={1}
    >
      <Text>
        {message.text}
      </Text>
    </Box>
  )
}

export default Message;
