import React from 'react';
import { Container, Divider, Feed, Header, Grid, Card, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SurfSuggestion from '../components/SurfSuggestion';
import UserDisplay from '../components/UserDisplay';
import { Locations } from '../../api/location/Location';
import { Users } from '../../api/user/Users';

class Home extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {

    // Sets CSS for header.
    const headerStyle = { fontFamily: 'Original Surfer, cursive', marginTop: '50px' };
    // Sets CSS for filters.
    const lucky = _.sample(this.props.userInfo, 1);
    const suggestion = _.sample(this.props.sub, 3);
    return (
      <Container textAlign='center'>
        <Header as='h1' style={headerStyle}>Location Suggestions</Header>
        <Divider />

        <Grid centered>
          <Grid.Row>
            <Feed>
              {suggestion.map(e => <SurfSuggestion key={e.name} suggestion={e} />)}
            </Feed>
          </Grid.Row>
        </Grid>
        <Header as='h1' style={headerStyle}>Surf Buddy Picks</Header>
        <Divider />
        <Card.Group centered>
          {lucky.map(user => <UserDisplay key={user.name} user={user} />)}
        </Card.Group>
      </Container>
    );
  }
}

Home.propTypes = {
  userInfo: PropTypes.array.isRequired,
  sub: PropTypes.array.isRequired,
  subscription2: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Locations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const ready2 = subscription2.ready();
  // Get the Stuff documents
  const sub = Locations.collection.find({}).fetch();
  const userInfo = Users.collection.find({}).fetch();

  return {
    userInfo,
    ready,
    sub,
    ready2,
  };
})(Home);
