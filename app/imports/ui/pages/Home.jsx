import React from 'react';
import { Container, Divider, Feed, Header, Segment, Dropdown, Grid, Card } from 'semantic-ui-react';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SurfSuggestion from '../components/SurfSuggestion';
import UserDisplay from '../components/UserDisplay';

export default class Home extends React.Component {

  suggestions=[
    {
      name: 'Pipeline',
      image: 'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2021/02/16153430/Klein_HAWAII_Feb2021_Pipeline_7855griffin_colapinto.jpg',
      waveHeight: '10-12 ft',
      ability: 5,
    },
    {
      name: 'Waimea',
      image: 'https://www.surfholidays.com/assets/images/blog/2012-03-20-legendary-surf-spots-waimea-0.jpg',
      waveHeight: '15-17 ft',
      ability: 5,
    },
    {
      name: 'Sandy Beach',
      image: 'https://i.ytimg.com/vi/7lMx81937v4/maxresdefault.jpg',
      waveHeight: '3-4 ft',
      ability: 3,
    },
  ]

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

  forecastData = [
    {
      name: 'Pipeline',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/fc/15/cf/beach.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2',
      swells: '3.8',
      wTemp: '77-79',
      weather: '77',
    },
    {
      name: 'Waimea Bay',
      image: 'https://www.best-of-oahu.com/images/xWaimea-Bay-Hawaii.jpg.pagespeed.ic.yfWUlSbrXr.jpg',
      surf: '6-8',
      tide: '0.2',
      wind: '2',
      swells: '3.8',
      wTemp: '77-79',
      weather: '77',
    },
    {
      name: 'Barbers Point',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/d5/d8/fc/beach.jpg',
      surf: '2-3',
      tide: '0.9',
      wind: '8',
      swells: '1.3',
      wTemp: '77-79',
      weather: '78',
    },
  ]

  render() {

    // Sets CSS for header.
    const headerStyle = { fontFamily: 'Original Surfer, cursive', marginTop: '50px' };

    // Sets CSS for filters.
    return (
      <Container textAlign='center'>
        <Header as='h1' style={headerStyle}>Location Suggestions</Header>
        <Divider />

        <Grid centered>
          <Grid.Row>
            <Feed>
              {this.suggestions.map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
            </Feed>
          </Grid.Row>
        </Grid>
        <Header as='h1' style={headerStyle}>Surf Buddy Picks</Header>
        <Divider />
        <Card.Group centered>
          {this.users.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
        <Header as='h1' style={headerStyle}>Top picks for the day</Header>
        <Divider />
      </Container>
    );
  }
}
