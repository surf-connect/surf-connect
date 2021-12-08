import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Divider, Segment, Loader, Accordion } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/message/Message';
import UserDisplay from '../components/UserDisplay';
import Message from '../components/Message';
import { Users } from '../../api/user/Users';

// Schema for filters form.
const formSchema = new SimpleSchema({
  ability: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 1,
  },
  time: {
    type: String,
    allowedValues: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am',
      '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],
    defaultValue: '12:00am',
  },
});

// Converts schema into a schema for uniforms.
const bridge = new SimpleSchema2Bridge(formSchema);
let abilityFilter = 1;
let timeFilter = '12:00am';

/** Renders a page which shows all users connected to a user based on similar filters.
 * The user is able to click the messages accordion to view all their messages and reply.
 * They are also able to message users they are connected to. They can also click the filters accordian and fill out a form to update their filters. */
class Connect extends React.Component {

  // On submit, filter users.
  submit(data) {
    const { ability, time } = data;
    abilityFilter = Number(ability);
    timeFilter = String(time);
    this.forceUpdate();
  }

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
    const headerStyle = { padding: '20px', fontFamily: 'Original Surfer, cursive' };

    // Sets CSS for message button.
    const messageStyle = {
      position: 'fixed',
      bottom: '100px',
      right: '80px',
      width: '300px',
      zIndex: 2,
    };

    // Sets CSS for filters.
    const filterStyle = {
      position: 'absolute',
      top: '93px',
      left: '20px',
      width: '300px',
      zIndex: 1,
    };

    return (
      <Container textAlign='center' id='connect-page'>
        <Header as='h3' style={headerStyle}>Users Connected By Time and Surfing Ability</Header>
        <Divider />
        <Card.Group stackable centered>
          {this.props.users.filter(user => (user.ability === abilityFilter && user.time === timeFilter)).map(user => <UserDisplay key={user._id} user={user} />)}
        </Card.Group>
        <Header as='h3' style={headerStyle}>Users Connected By Surfing Ability</Header>
        <Divider />
        <Card.Group stackable centered>
          {this.props.users.filter(user => user.ability === abilityFilter).map(user => <UserDisplay key={user._id} user={user} />)}
        </Card.Group>
        <Header as='h3' style={headerStyle}>Users Connected By Time</Header>
        <Divider />
        <Card.Group stackable centered>
          {this.props.users.filter(user => user.time === timeFilter).map(user => <UserDisplay key={user._id} user={user} />)}
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
        <div style={filterStyle}>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick} >
              Filters
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1} >
              <Segment>
                <Header>Filters:</Header>
                <Divider />
                <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
                  <SelectField name='ability' />
                  <SelectField name='time' />
                  <SubmitField />
                </AutoForm>
              </Segment>
            </Accordion.Content>
          </Accordion>
        </div>
      </Container>
    );
  }
}

Connect.propTypes = {
  messages: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Message and User documents.
  const subscription = Meteor.subscribe(Messages.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);

  // console.log(`Username: ${Messages.userPublicationName}`);

  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Message documents
  const messages = Messages.collection.find({}).fetch();
  // Get the user documents
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const users = Users.collection.find({ owner: { $not: currentUser } }).fetch();
  return {
    messages,
    users,
    ready,
  };
})(Connect);
