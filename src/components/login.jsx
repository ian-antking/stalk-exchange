import React from 'react';
import {
  Label,
  Input,
} from '@rebass/forms';
import {
  Box,
  Button,
} from 'rebass';
import apiString from '../utils/api-string';
import TokenManager from '../utils/token-manager';

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
    const data = JSON.stringify(this.state.fields);
    window.fetch(`${apiString}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        TokenManager.setToken(data.token);
      });

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
        required
        value={this.state.fields.name}
        onChange={event => this.handleFieldChange(event)}
      />
      <Label py={2} htmlFor='login_island_input'>Island</Label>
      <Input
        id='login_island_input'
        name='island'
        required
        value={this.state.fields.island}
        onChange={event => this.handleFieldChange(event)}
      />
      <Label py={2} htmlFor='login_password_input'>Password</Label>
      <Input
        id='login_password_input'
        name='password'
        required
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