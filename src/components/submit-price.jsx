import React from 'react';
import { Input } from '@rebass/forms';
import { Box, Button, Card, Heading, Image } from 'rebass';
import { postPrice } from '../utils/fetch-helpers';

import bells from '../images/bells.svg';
import { format } from 'date-fns';

class SubmitPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        bells: '',
        date: this.props.date,
      },
      working: false,
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

  toggleWorking = () => {
    this.setState({
      ...this.state,
      working: !this.state.working,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.toggleWorking();
    const body = JSON.stringify(this.state.fields);
    const response = await postPrice(body);
    const message = response.ok
      ? 'current price submitted'
      : `${response.status}: ${response.statusText}`;
    this.props.setMessage(message, !response.ok);
    response.ok && this.props.refreshPrices();
    this.toggleWorking();
  };

  render() {
    const { period } = this.props;
    const heading =
      period || `Submit turnip price for ${format(Date.now(), 'E a')}`;
    return (
      !this.state.working && (
        <Card>
          <Heading>{heading}</Heading>
          <Box as="form">
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Image src={bells} alt="a bag of bells" mx={1} />
              <Input
                id="price_bells_input"
                name="bells"
                required
                type="number"
                width="30%"
                value={this.state.fields.bells}
                onChange={(event) => this.handleFieldChange(event)}
              />
              <Button
                my={0}
                mx={1}
                varient="primary"
                onClick={(event) => this.handleSubmit(event)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Card>
      )
    );
  }
}

export default SubmitPrice;
