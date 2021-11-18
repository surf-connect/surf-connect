import React from 'react';
import { Container, Card, Header, Divider, Dropdown, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
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
      '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00am'],
    defaultValue: '12:00am',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

export default class Connect extends React.Component {

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
    {
      name: 'User 3',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      time: '8:00am',
      ability: 2,
      description: 'Brooos! What up lets get pitted!',
    },
  ]

  messages=[
    {
      sender: 'User 2',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      receiver: 'User 1',
      message: 'Yo whats up? Wanna surf today?',
    },
    {
      sender: 'User 3',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      receiver: 'User 1',
      message: 'You down to surf?',
    },
  ]

  render() {

    // Sets CSS for message button.
    const messageStyle = {
      position: 'fixed',
      bottom: '100px',
      right: '80px',
      width: '200px',
      zIndex: 2,
    };

    // Sets CSS for filters.
    const filterStyle = {
      position: 'absolute',
      top: '93px',
      left: '-90px',
      width: '300px',
      zIndex: 1,
    };

    return (
      <Container textAlign='center' >
        <Header as='h3'>Users Connected By Time and Surfing Ability</Header>
        <Divider />
        <Card.Group centered>
          {this.users.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header>Users Connected By Surfing Ability</Header>
        <Divider />
        <Card.Group centered>
          {[this.users[0]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header>Users Connected By Time</Header>
        <Divider />
        <Card.Group centered>
          {[this.users[1], this.users[2]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <div style={messageStyle}>
          <Dropdown text='Messages' icon='chat' floating labeled button className='icon'>
            <Dropdown.Menu>
              {this.messages.map(message => <Message key={message.message} message={message} />)}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={filterStyle}>
          <Dropdown text='Filters'>
            <Dropdown.Menu>
              <Segment>
                <Header>Filters:</Header>
                <Divider />
                <AutoForm schema={bridge}>
                  <SelectField name='ability' />
                  <SelectField name='time' />
                  <SubmitField />
                </AutoForm>
              </Segment>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    );
  }
}
