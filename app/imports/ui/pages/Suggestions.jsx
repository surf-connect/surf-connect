import React from 'react';
import { Container, Divider, Feed, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SurfSuggestion from '../components/SurfSuggestion';
import { Locations } from '../../api/location/Location';
import { Users } from '../../api/user/Users';

/** Renders a page that shows all of the suggestions for a user based on their surfing ability. */
class Suggestions extends React.Component {

  render() {
    const headerStyle = { fontFamily: 'Original Surfer, cursive', marginTop: '50px' };
    return (
      <Container textAlign='center' id='suggestion-page'>
        <Header as='h1' style={headerStyle}>Surf Suggestions</Header>
        <Divider />
        <Feed>
          {(this.props.sub.filter(suggestion => suggestion.ability === this.props.currentUser[0].ability)).map(suggestion => <SurfSuggestion key={suggestion.name} suggestion={suggestion} />)}
        </Feed>
      </Container>
    );
  }
}

Suggestions.propTypes = {
  sub: PropTypes.array.isRequired,
  currentUser: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Locations.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const currUser = Meteor.user() ? Meteor.user().username : '';
  // Get all locations
  const sub = Locations.collection.find({}).fetch();
  // Gets current user.
  const currentUser = Users.collection.find({ owner: currUser }).fetch();
  return {
    ready,
    sub,
    currentUser,
  };
})(Suggestions);
