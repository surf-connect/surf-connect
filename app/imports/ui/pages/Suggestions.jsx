import React from 'react';
import { Container, Divider, Feed, Header, Segment, Accordion } from 'semantic-ui-react';
import { AutoForm, SelectField, SubmitField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
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

let abilityFilter = 1;

/** Renders a page that shows all of the suggestions for a user based on their surfing ability. */
class Suggestions extends React.Component {

  // On submit, filter suggestions.
  submit(data) {
    abilityFilter = Number(data.ability);
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

  render() {
    const { activeIndex } = this.state;

    // Sets CSS for header.
    const headerStyle = { fontFamily: 'Original Surfer, cursive' };

    // Sets CSS for filters.
    const filterStyle = {
      position: 'absolute',
      top: '75px',
      left: '30px',
      width: '300px',
      zIndex: 1,
    };
    return (
      <Container textAlign='center' id='suggestion-page'>
        <Header as='h1' style={headerStyle}>Surf Suggestions</Header>
        <Divider />
        <Feed>
          {(this.props.sub.filter(suggestion => suggestion.ability === abilityFilter)).map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
        </Feed>
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

Suggestions.propTypes = {
  sub: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

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
