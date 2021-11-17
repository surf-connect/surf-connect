import React from 'react';
import { Container, Card, Header, Divider, Form, Radio, Dropdown } from 'semantic-ui-react';
import UserDisplay from '../components/UserDisplay';
import Message from '../components/Message';

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
    const messageStyle = {
      position: 'fixed',
      bottom: '100px',
      right: '60px',
      width: '200px',
    };

    return (
      <Container>
        <Header>Users Connected By Time and Surfing Ability</Header>
        <Card.Group>
          {this.users.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header>Users Connected By Surfing Ability</Header>
        <Card.Group>
          {[this.users[0]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header>Users Connected By Time</Header>
        <Card.Group>
          {[this.users[1], this.users[2]].map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <div style={messageStyle}>
          <Dropdown icon='huge chat'>
            <Dropdown.Menu>
              {this.messages.map(message => <Message key={message.message} message={message} />)}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Divider />
        <Header>Filters:</Header>
        <Form>
          <Form.Group>
            <label>Surfing Ability:</label>
            <Form.Field control={Radio} name='ability' label='1' value='1' />
            <Form.Field control={Radio} name='ability' label='2' value='2' />
            <Form.Field control={Radio} name='ability' label='3' value='3' />
            <Form.Field control={Radio} name='ability' label='4' value='4' />
            <Form.Field control={Radio} name='ability' label='5' value='5' />
          </Form.Group>
          <Form.Group>
            <label>Time You Would Like to Surf:</label>
            <Form.Select placeholder='Time' />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
