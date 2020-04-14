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
      working: false,
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

  toggleWorking = () => {
    this.setState({
      ...this.state,
      working: !this.state.working,
    });
  };

  handleLogin = async event => {
    event.preventDefault();
    this.toggleWorking();
    const body = JSON.stringify(this.state.fields);
    const response = await login(body);
    const message =
      !response.ok && `${response.status}: ${response.statusText}`;
    this.props.setMessage(message, !response.ok);
    const data = response.ok && (await response.json());
    if (data) {
      TokenManager.setToken(data.token);
      this.props.onLogin();
      this.props.history.push('/');
    } else {
      this.toggleWorking();
    }
  };

  render() {
    return this.state.working ? <Heading>Logging In...</Heading> : (
      <React.Fragment>
        <Heading>Login</Heading>
        <Box
          as="form"
        >
          <Label htmlFor="login_name_input">
            Name
          </Label>
          <Input
            id="login_name_input"
            name="name"
            required
            value={this.state.fields.name}
            onChange={event => this.handleFieldChange(event)}
          />
          <Label htmlFor="login_island_input">
            Island
          </Label>
          <Input
            id="login_island_input"
            name="island"
            required
            value={this.state.fields.island}
            onChange={event => this.handleFieldChange(event)}
          />
          <Label htmlFor="login_password_input">
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
            varient="primary"
            onClick={event => this.handleLogin(event)}
          >
            Login
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}

export default Login;
