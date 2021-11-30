import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendMessage from './SendMessage';

/** Renders an input box to send a message to a user. Based on the messageView prop, it is either empty if false, or has an input box if true. */
class MessageForm extends React.Component {
  // Checks whether input box should display.
  display() {
    if (this.props.messageView) {
      // Renders input box in card.
      return (
        <Card.Content>
          {/* Creates the SendMessage component which is a form the user can fill out and send to another user. */}
          {/* The receiver of the message is the user's name from their user suggestion card on the connect page. */}
          <SendMessage key={this.props.user._id} receiver={this.props.user.name} messageType={'Message'}/>
        </Card.Content>
      );
    }
    // Nothing extra is rendered.
    return (
      <Card.Content>
      </Card.Content>
    );
  }

  render() {
    return (
      this.display()
    );
  }
}

MessageForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
    ability: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  messageView: PropTypes.bool.isRequired,
};

export default withRouter(MessageForm);
