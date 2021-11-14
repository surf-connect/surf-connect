import React from 'react';
import { Container, Feed, Header } from 'semantic-ui-react';
import SurfSuggestion from '../components/SurfSuggestion';

export default class Suggestions extends React.Component {

  suggestions=[
    {
      name: 'Pipeline',
      waveHeight: '10-12 ft',
      ability: 5,
    },
    {
      name: 'Waimea',
      waveHeight: '15-17 ft',
      ability: 5,
    },
    {
      name: 'Sandy Beach',
      waveHeight: '3-4 ft',
      ability: 3,
    },
  ]

  render() {
    return (
      <Container>
        <Header>Surf Suggestions</Header>
        <Feed>
          {this.suggestions.map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
        </Feed>
      </Container>
    );
  }
}
