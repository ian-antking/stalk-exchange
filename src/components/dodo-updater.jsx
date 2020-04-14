import React from 'react';
import { Box, Button, Card, Heading } from 'rebass';
import { Input } from '@rebass/forms';

class DodoUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: false,
      fields: {
        dodoCode: '',
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const body = this.state.fields;
    if (!body.dodoCode) {
      this.props.setMessage('No DodoCode entered!', true);
    } else {
      this.setState(
        {
          fields: {
            dodoCode: '',
          },
          working: true,
        },
        async () => {
          await this.props.updateUser(JSON.stringify(body)).then(() => {
            this.setState({
              ...this.state,
              working: false,
            });
          });
        }
      );
    }
  };

  render = () => {
    const user = this.props.users.find(
      (user) => user._id === this.props.user._id
    );
    const controlPanel = !user.dodoCode ? (
      <React.Fragment>
        <Heading>DodoCode</Heading>
        <Box as="form" display="flex" justifyContent="space-evenly">
          <Input
            width="50%"
            id="dodocode_input"
            name="dodoCode"
            required
            value={this.state.fields.dodoCode}
            onChange={(event) => this.handleFieldChange(event)}
          />
          <Button onClick={(event) => this.handleSubmit(event)}>Open</Button>
        </Box>
      </React.Fragment>
    ) : (
      <Button onClick={(event) => this.handleSubmit(event)}>
        Close Island
      </Button>
    );
    return (
      <Card>
        {this.state.working ? <Heading>Updating...</Heading> : controlPanel}
      </Card>
    );
  };
}

export default DodoUpdater;
