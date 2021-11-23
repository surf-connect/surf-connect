import React from 'react';
import { Button, Divider, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendMessage from './SendMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  constructor() {
    super();
    this.replyClicked = false;
  }

  render() {
    return (
      <Segment>
        <Grid columns='2'>
          <Grid.Column>
            <Header as='h3'>{`From: ${this.props.message.sender}`}</Header>
          </Grid.Column>
          <Grid.Column>
            <Image size='tiny' src={this.props.message.image} />
          </Grid.Column>
        </Grid>
        <Divider />
        <p>{this.props.message.message}</p>
        <div className='two ui buttons'>
          <SendMessage key={this.props.message._id} message={this.props.message} />
        </div>
      </Segment>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string,
    image: PropTypes.string,
    receiver: PropTypes.string,
    message: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(Message);
