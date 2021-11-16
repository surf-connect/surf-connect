import React from 'react';
import { Container, Feed, Header } from 'semantic-ui-react';
import SurfSuggestion from '../components/SurfSuggestion';

export default class Suggestions extends React.Component {

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

  render() {
    return (
      <Container textAlign='center'>
        <Header as='h1'>Surf Suggestions</Header>
        <Feed>
          {this.suggestions.map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
        </Feed>
      </Container>
    );
  }
}
