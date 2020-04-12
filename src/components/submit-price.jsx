import React from 'react';
import { Input } from '@rebass/forms';
import { Box, Button, Heading } from 'rebass';
import { postPrice } from '../utils/fetch-helpers';

class SubmitPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        bells: '',
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

  handleSubmit = async event => {
    event.preventDefault();
    this.toggleWorking();
    const body = JSON.stringify(this.state.fields);
    const response = await postPrice(body)
    const message = response.ok ? 'current price submitted' : `${response.status}: ${response.statusText}`;
    this.props.setMessage(message, !response.ok);
    response.ok && this.props.getPrices();
    this.toggleWorking()
  };

  render() {
    return !this.state.working && (
      <React.Fragment>
        <Heading my={3}>Submit Prices</Heading>
        <Box
          as="form"
          width={2 / 3}
          margin="auto"
        >
          <Input
            id="price_bells_input"
            name="bells"
            required
            type="number"
            value={this.state.fields.bells}
            onChange={event => this.handleFieldChange(event)}
          />
          <Button
            my={3}
            width="100%"
            varient="primary"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </Button>
        </Box>
      </React.Fragment>
    );
  }
}

export default SubmitPrice;
