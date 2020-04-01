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
        this.props.onLogin()
        this.props.history.push('/');
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
          value={this.state.fields.password}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_confirmPassword_input'>Confirm Password</Label>
        <Input
          id='signUp_confirmPassword_input'
          name='password'
          value={this.state.fields.confirmPassword}
          onChange={event => this.handleFieldChange(event)}
        />
        <Label py={2} htmlFor='signUp_inviteCode_input'>Invite Code</Label>
        <Input
          id='signUp_inviteCode_input'
          name='password'
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