import React from 'react';
import { Container, Divider, Feed, Header, Segment, Dropdown } from 'semantic-ui-react';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SurfSuggestion from '../components/SurfSuggestion';

const formSchema = new SimpleSchema({
  ability: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 1,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a page that shows all of the suggestions for a user based on their surfing ability. */
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

    // Sets CSS for header.
    const headerStyle = { fontFamily: 'Original Surfer, cursive' };

    // Sets CSS for filters.
    const filterStyle = {
      position: 'absolute',
      top: '93px',
      left: '-90px',
      width: '300px',
      zIndex: 1,
    };
    return (
      <Container textAlign='center'>
        <Header as='h1' style={headerStyle}>Surf Suggestions</Header>
        <Divider />
        <Feed>
          {this.suggestions.map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
        </Feed>
        <div style={filterStyle}>
          <Dropdown text='Filters'>
            <Dropdown.Menu>
              <Segment>
                <Header>Filters:</Header>
                <Divider />
                <AutoForm schema={bridge}>
                  <SelectField name='ability' />
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
