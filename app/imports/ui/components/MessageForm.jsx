import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendMessage from './SendMessage';

class MessageForm extends React.Component {

  display() {
    if (this.props.messageView) {
      return (
        <Card.Content>
          <SendMessage key={this.props.user._id} receiver={this.props.user.name}/>
        </Card.Content>
      );
    }
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
