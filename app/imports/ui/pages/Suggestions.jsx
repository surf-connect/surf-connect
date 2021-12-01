import React from 'react';
import { Container, Divider, Feed, Header, Segment, Dropdown } from 'semantic-ui-react';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SurfSuggestion from '../components/SurfSuggestion';
import { Locations } from '../../api/location/Location';

const formSchema = new SimpleSchema({
  ability: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 1,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a page that shows all of the suggestions for a user based on their surfing ability. */
class Suggestions extends React.Component {

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
      <Container textAlign='center' id='suggestion-page'>
        <Header as='h1' style={headerStyle}>Surf Suggestions</Header>
        <Divider />
        <Feed>
          {this.props.sub.map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
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

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Locations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const sub = Locations.collection.find({}).fetch();

  return {
    ready,
    sub,
  };
})(Suggestions);
