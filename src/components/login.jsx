import React from 'react';
import {
  Label,
  Input,
} from '@rebass/forms';
import {
  Box,
  Button,
} from 'rebass';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: '',
        island: '',
        password: '',
      },
    };
  }

  handleFieldChange = (event) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    
  };

  render() {
    return (
      <Box
        as='form'
        submit={event => this.preventDefault(event)}
        py={3}
        width={2/3}
        margin='auto'
      >
      <Label py={2} htmlFor='login_name_input'>Name</Label>
      <Input
        id='login_name_input'
        name='name'
        value={this.state.fields.name}
        onChange={event => this.handleFieldChange(event)}
      />
      <Label py={2} htmlFor='login_island_input'>Island</Label>
      <Input
        id='login_island_input'
        name='island'
        value={this.state.fields.island}
        onChange={event => this.handleFieldChange(event)}
      />
      <Label py={2} htmlFor='login_password_input'>Password</Label>
      <Input
        id='login_password_input'
        name='password'
        type='password'
        value={this.state.fields.password}
        onChange={event => this.handleFieldChange(event)}
      />
      <Button
        my={3}
        width='100%'
        varient='primary'
        onClick={this.handleLogin}
      >
        Login
      </Button>
      </Box>
    );
  }
}

export default Login;