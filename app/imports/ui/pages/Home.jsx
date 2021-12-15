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
    // eslint-disable-next-line no-undef
    const lucky = _.sample(this.props.userInfo, 3);
    // eslint-disable-next-line no-undef
    const suggestion = _.sample(this.props.sub, 3);
    return (
      <Container id={'home'} textAlign='center'>
        <Header as='h1' style={headerStyle}>Random Location Suggestions</Header>
        <Divider />

        <Grid centered>
          <Grid.Row>
            <Feed>
              {suggestion.map(e => <SurfSuggestion key={e.name} suggestion={e} />)}
            </Feed>
          </Grid.Row>
        </Grid>
        <Header as='h1' style={headerStyle}>Random Surf Buddy Picks</Header>
        <Divider />
        <Card.Group centered>
          {lucky.map(user => <UserDisplay key={user.name} user={user} senderImage={this.props.currentUser[0].image}/>)}
        </Card.Group>
      </Container>
    );
  }
}

Home.propTypes = {
  currentUser: PropTypes.array.isRequired,
  userInfo: PropTypes.array.isRequired,
  sub: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Locations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  const currUser = Meteor.user() ? Meteor.user().username : '';
  const sub = Locations.collection.find({}).fetch();
  const userInfo = Users.collection.find({}).fetch();
  const currentUser = Users.collection.find({ owner: currUser }).fetch();
  return {
    currentUser,
    userInfo,
    ready,
    sub,
  };
})(Home);
