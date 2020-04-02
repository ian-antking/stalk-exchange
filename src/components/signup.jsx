import React from 'react';
import {
  Label,
  Input,
} from '@rebass/forms';
import {
  Box,
  Button,
  Heading,
} from 'rebass';
import apiString from '../utils/api-string';
import TokenManager from '../utils/token-manager';

class SignUP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: '',
        island: '',
        friendCode: '',
        password: '',
        confirmPassword: '',
        inviteCode: '',
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

  handleSignUP = (event) => {
    event.preventDefault();
    const fields = this.state.fields;
    if (fields.password !== fields.confirmPassword) {
      return this.props.setMessage('Passwords do not match!', true);
    }
    const data = JSON.stringify(fields);
    window.fetch(`${apiString}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })
      .then(res => {
        const errorMessage = res.status === 201 ? null : `${res.status}: ${res.statusText}`;
        errorMessage && this.props.setMessage(errorMessage, true);
        return errorMessage ? null : res.json();
      })
      .then(data => {
        if (data) {
        const { name, island, password } = fields;
        const loginData = {
          name,
          island,
          password,
        }
        window.fetch(`${apiString}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData),
        })
          .then(res => res.json())
          .then(data => {
            this.props.setMessage('Welcome!')
            TokenManager.setToken(data.token);
            this.props.onLogin()
            this.props.history.push('/');
          });
        };
      });
  };

  render() {
    return (
      <React.Fragment>
        <Heading my={3}>Sign Up</Heading>
        <Box
          as='form'
          submit={event => this.preventDefault(event)}
          width={2/3}
          margin='auto'
        >
        <Label py={2} htmlFor='signUp_name_input'>Name</Label>
        <Input
          id='signUp_name_input'
          name='name'
          value={this.state.fields.name}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_island_input'>Island</Label>
        <Input
          id='signUp_island_input'
          name='island'
          value={this.state.fields.island}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_friendCode_input'>Friend Code</Label>
        <Input
          id='signUp_friendCode_input'
          name='friendCode'
          value={this.state.fields.friendCode}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_password_input'>Password</Label>
        <Input
          id='signUp_password_input'
          name='password'
          type='password'
          value={this.state.fields.password}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_confirmPassword_input'>Confirm Password</Label>
        <Input
          id='signUp_confirmPassword_input'
          name='confirmPassword'
          type='password'
          value={this.state.fields.confirmPassword}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_inviteCode_input'>Invite Code</Label>
        <Input
          id='signUp_inviteCode_input'
          name='inviteCode'
          value={this.state.fields.inviteCode}
          onChange={event => this.handleFieldChange(event)}
        />
        <Button
          my={3}
          width='100%'
          varient='primary'
          onClick={this.handleSignUP}
        >
          Sign Up
        </Button>
        </Box>
      </React.Fragment>
    );
  }
}

export default SignUP;