import React from 'react';
import { Label, Input } from '@rebass/forms';
import { Box, Button, Heading } from 'rebass';
import TokenManager from '../utils/token-manager';
import { login } from '../utils/fetch-helpers';

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

  handleFieldChange = event => {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = async event => {
    event.preventDefault();
    const body = JSON.stringify(this.state.fields);
    const response = await login(body);
    const message =
      !response.ok && `${response.status}: ${response.statusText}`;
    this.props.setMessage(message, !response.ok);
    const data = response.ok && (await response.json());
    data && TokenManager.setToken(data.token);
    data && this.props.onLogin();
    data && this.props.history.push('/');
  };

  render() {
    return (
      <React.Fragment>
        <Heading my={3}>Login</Heading>
        <Box
          as="form"
          submit={event => this.preventDefault(event)}
          width={2 / 3}
          margin="auto"
        >
          <Label py={2} htmlFor="login_name_input">
            Name
          </Label>
          <Input
            id="login_name_input"
            name="name"
            required
            value={this.state.fields.name}
            onChange={event => this.handleFieldChange(event)}
          />
          <Label py={2} htmlFor="login_island_input">
            Island
          </Label>
          <Input
            id="login_island_input"
            name="island"
            required
            value={this.state.fields.island}
            onChange={event => this.handleFieldChange(event)}
          />
          <Label py={2} htmlFor="login_password_input">
            Password
          </Label>
          <Input
            id="login_password_input"
            name="password"
            required
            type="password"
            value={this.state.fields.password}
            onChange={event => this.handleFieldChange(event)}
          />
          <Button
            my={3}
            width="100%"
            varient="primary"
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}

export default Login;
