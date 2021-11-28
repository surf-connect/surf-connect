import React from 'react';
import { Accordion, Divider, Grid, Header, Icon, Image, Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendMessage from './SendMessage';
import { Messages } from '../../api/message/Message';

/** Renders a Message box which will show the information of a message sent to a user. There is also a reply section which can be opened up and a reply message can be sent through a form. */
class Message extends React.Component {
  // Sets state for accordian clicks.
  state = { activeState: 0 };

  // Handles accordion clicks.
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    let newIndex = index;
    if (activeIndex === index) {
      newIndex = -1;
    }
    this.setState({ activeIndex: newIndex });
  }

  deleteMessage = () => {
    Messages.collection.remove({ _id: this.props.message._id });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Segment>
        <Grid stackable columns='3'>
          <Grid.Column>
            <Header as='h5' textAlign='left' >{`From: ${this.props.message.sender}`}</Header>
          </Grid.Column>
          <Grid.Column>
            <Image size='tiny' src={this.props.message.image} />
          </Grid.Column>
          <Grid.Column>
            <Button inverted onClick={() => this.deleteMessage()}>
              <Icon name='x' color='red' />
            </Button>
          </Grid.Column>
        </Grid>
        <Divider />
        <p>{this.props.message.message}</p>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick} >
            Reply To Message
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} >
            {/* Creates SendMessage component with the receiver of the message being the sender of the last message (reply). */}
            <SendMessage key={this.props.message._id} receiver={this.props.message.sender} messageType={'Reply'}/>
          </Accordion.Content>
        </Accordion>
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
