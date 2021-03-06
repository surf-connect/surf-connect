import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MessageForm from './MessageForm';

/** Renders a user's information in a UI card. A message and like feature is allowed for users to message and like this user. */
class UserDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      // Holds the state whether an input box should be shown or not.
      messageView: false,
    };
  }

  buttonClick = () => {
    // Sets messageView state to true or false based on what it was before.
    this.setState({ messageView: !this.state.messageView });
  };

  render() {
    const descStyle = { height: '50px' };
    const buttonStyle = { width: '250px' };
    return (
      <Card id={'user-card'}>
        <Card.Content>
          <Card.Header>{this.props.user.name}</Card.Header>
          <Card.Meta>{this.props.user.time}</Card.Meta>
        </Card.Content>
        <Image src={this.props.user.image}/>
        <Card.Content>
          <Card.Meta>{`Surf Ability Level: ${this.props.user.ability}`}</Card.Meta>
          <Card.Description style={descStyle}>{this.props.user.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button style={buttonStyle} animated basic color='blue' id='message-click' onClick={() => this.buttonClick()}>
            <Button.Content visible>
              <Icon name='chat'/>
            </Button.Content>
            <Button.Content hidden>
              Message user
            </Button.Content>
          </Button>
        </Card.Content>
        {/* Creates a MesssageForm component and sets messageView to the state that it is at. */}
        {<MessageForm user={this.props.user} messageView={this.state.messageView} senderImage={this.props.senderImage}/>}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserDisplay.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
    ability: PropTypes.number,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  senderImage: PropTypes.string.isRequired,
};

export default withRouter(UserDisplay);
