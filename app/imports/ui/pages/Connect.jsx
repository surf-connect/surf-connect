import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Divider, Dropdown, Segment, Loader, Accordion } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/message/Message';
import UserDisplay from '../components/UserDisplay';
import Message from '../components/Message';

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

const bridge = new SimpleSchema2Bridge(formSchema);

class Connect extends React.Component {

  state = { activeState: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    let newIndex = index;
    if (activeIndex === index) {
      newIndex = -1;
    }
    this.setState({ activeIndex: newIndex });
  }

  users=[
    {
      name: 'User 1',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      time: '3:00pm',
      ability: 4,
      description: 'I love surfing! Picked it up about 5 years ago and I am considered to be a high level surfer but not professional!',
    },
    {
      name: 'User 2',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      time: '8:00am',
      ability: 5,
      description: 'I like surfing in the morning! Message me!!',
    },
    {
      name: 'User 3',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      time: '8:00am',
      ability: 2,
      description: 'Brooos! What up lets get pitted!',
    },
  ];

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
      <Container textAlign='center' >
        <Header as='h3' style={headerStyle}>Users Connected By Time and Surfing Ability</Header>
        <Divider />
        <Card.Group centered>
          {this.users.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header as='h3' style={headerStyle}>Users Connected By Surfing Ability</Header>
        <Divider />
        <Card.Group centered>
          {[this.users[0]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header as='h3' style={headerStyle}>Users Connected By Time</Header>
        <Divider />
        <Card.Group centered>
          {[this.users[1], this.users[2]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <div style={messageStyle}>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick} >
              Messages
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} >
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
                <AutoForm schema={bridge}>
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

// Require an array of Stuff documents in the props.
Connect.propTypes = {
  messages: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Messages.userPublicationName);
  console.log(`Username: ${Messages.userPublicationName}`);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Message documents
  const messages = Messages.collection.find({}).fetch();
  return {
    messages,
    ready,
  };
})(Connect);
