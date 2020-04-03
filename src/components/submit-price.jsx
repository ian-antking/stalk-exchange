import React from 'react';
import {
  Input,
} from '@rebass/forms';
import {
  Box,
  Button,
  Heading,
} from 'rebass';
import apiString from '../utils/api-string';
import TokenManager from '../utils/token-manager';
import { isSunday } from '../utils/date-helpers';

class SubmitPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        bells: '',
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

  handleSubmit = (event) => {
    event.preventDefault();
    const body = JSON.stringify(this.state.fields);
    const action = isSunday() ? 'buy' : 'sell'
    window.fetch(`${apiString}/price/${action}`, {
      method: 'POST',
      headers: {
        'Authorization': TokenManager.getToken(),
        'Content-Type': 'application/json'
      },
      body: body,
    })
      .then(res => {
        const errorMessage = res.status === 201 ? `New turnip price submitted!` : `${res.status}: ${res.statusText}`;
        errorMessage && this.props.setMessage(errorMessage);
        this.props.getPrices();
      })
  };

  render() {
    return (
      <React.Fragment>
        <Heading my={3}>Submit Prices</Heading>
        <Box
          as='form'
          submit={event => this.preventDefault(event)}
          width={2/3}
          margin='auto'
        >
          <Input
            id='price_bells_input'
            name='bells'
            required
            type='number'
            value={this.state.fields.bells}
            onChange={event => this.handleFieldChange(event)}
          />
        <Button
          my={3}
          width='100%'
          varient='primary'
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
        </Box>
      </React.Fragment>
    );
  }
}

export default SubmitPrice;