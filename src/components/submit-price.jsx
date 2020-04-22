import React from 'react';
import { Input } from '@rebass/forms';
import { Box, Button, Card, Heading, Image } from 'rebass';
import { postPrice } from '../utils/fetch-helpers';

import bells from '../images/bells.svg';

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
    response.ok && this.props.refreshPrices();
    this.toggleWorking()
  };

  render() {
    return !this.state.working && (
      <Card>
        <Heading>Submit Prices</Heading>
        <Box
          as="form"
        >
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >
            <Image
              src={bells}
              alt='a bag of bells'
              mx={3}
            />
            <Input
              id="price_bells_input"
              name="bells"
              required
              type="number"
              width='80%'
              value={this.state.fields.bells}
              onChange={event => this.handleFieldChange(event)}
            />  
          </Box>
          <Button
            width="100%"
            varient="primary"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </Button>
        </Box>
      </Card>
    );
  }
}

export default SubmitPrice;
