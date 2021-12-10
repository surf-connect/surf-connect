import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Divider, Loader, Accordion } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/message/Message';
import UserDisplay from '../components/UserDisplay';
import Message from '../components/Message';
import { Users } from '../../api/user/Users';

/** Renders a page which shows all users connected to a user based on similar filters.
 * The user is able to click the messages accordion to view all their messages and reply.
 * They are also able to message users they are connected to. They can also click the filters accordian and fill out a form to update their filters. */
class Connect extends React.Component {
  // Sets state for each accordian. When pressed, the state changes.
  state = { activeState: 0 };

  // Handle click for accordians.
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    let newIndex = index;
    if (activeIndex === index) {
      newIndex = -1;
    }
    this.setState({ activeIndex: newIndex });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { activeIndex } = this.state;

    // Sets CSS for header.
    const headerStyle = { padding: '20px', fontFamily: 'Original Surfer, cursive', marginTop: '50px' };

    // Sets CSS for message button.
    const messageStyle = {
      position: 'fixed',
      bottom: '100px',
      right: '80px',
      width: '300px',
      zIndex: 2,
    };
    const userAbility = (this.props.currentUser.length === 0) ? 1 : (this.props.currentUser[0].ability);
    const userTime = (this.props.currentUser.length === 0) ? '12:00am' : (this.props.currentUser[0].time);
    return (
      <Container textAlign='center' id='connect-page'>
        <Header as='h3' style={headerStyle}>Users Connected By Surfing Ability</Header>
        <Divider />
        <Card.Group stackable centered>
          {this.props.users.filter(user => user.ability === userAbility).map(user => <UserDisplay key={user._id} user={user} />)}
        </Card.Group>
        <Header as='h3' style={headerStyle}>Users Connected By Time</Header>
        <Divider />
        <Card.Group stackable centered>
          {this.props.users.filter(user => user.time === userTime).map(user => <UserDisplay key={user._id} user={user} />)}
        </Card.Group>
        <div style={messageStyle}>
          <Accordion fluid styled id='user-messages'>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick} >
              Messages
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} >
              {/* Gets all messages sent to the user. */}
              {this.props.messages.map(message => <Message key={message._id} message={message} />)}
            </Accordion.Content>
          </Accordion>
        </div>
      </Container>
    );
  }
}

Connect.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Message and User documents.
  const subscription = Meteor.subscribe(Messages.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Message documents
  const messages = Messages.collection.find({}).fetch();
  // Get the user documents
  const currUser = Meteor.user() ? Meteor.user().username : '';
  // Gets all users other than the current user.
  const users = Users.collection.find({ owner: { $not: currUser } }).fetch();
  // Gets current user.
  const currentUser = Users.collection.find({ owner: currUser }).fetch();
  return {
    messages,
    currentUser,
    users,
    ready,
  };
})(Connect);
