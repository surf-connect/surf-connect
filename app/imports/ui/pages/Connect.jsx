import React from 'react';
import { Container, Card, Header } from 'semantic-ui-react';
import UserDisplay from '../components/UserDisplay';

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

  render() {
    return (
      <Container>
        <Header>Users Connected By Time and Surfing Ability</Header>
        <Card.Group>
          {this.users.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
      </Container>
    );
  }
}
