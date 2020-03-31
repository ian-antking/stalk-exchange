import React from 'react';
import {
  Label,
  Input,
} from '@rebass/forms';
import {
  Box,
  Button,
} from 'rebass';

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
        Sign UP
      </Button>
      </Box>
    );
  }
}

export default SignUP;