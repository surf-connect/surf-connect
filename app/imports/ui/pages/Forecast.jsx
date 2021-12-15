import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Locations } from '../../api/location/Location';
import { Users } from '../../api/user/Users';

class Forecast extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {
    const style = { marginTop: '50px', fontFamily: 'Original Surfer, cursive' };
    const headerStyle = {
      WebkitTextStroke: '1px black',
    };
    return (
      <Container id='forecast-page'>
        <Header as='h1' style={style} textAlign='center'>Oahu Surf Forecast</Header>
        <Table fixed inverted size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Header as='h2' inverted>Location</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2' inverted>Surf Height</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2' inverted>Wind</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2' inverted>Temperature</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2' inverted>Weather</Header></Table.HeaderCell>
              <Table.HeaderCell><Header as='h2' inverted>Ability</Header></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.locations.map(location => <Table.Row style={ { backgroundImage: `url(${(location.image)})`, backgroundSize: 'cover', height: '100px', backgroundPosition: 'center' } } key={location.name}>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.name}</Header></Table.Cell>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.surf}</Header></Table.Cell>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.wind}</Header></Table.Cell>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.temperature} &deg;F</Header></Table.Cell>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.weather}</Header></Table.Cell>
              <Table.Cell><Header as='h3' style={headerStyle} inverted>{location.ability}</Header></Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

Forecast.propTypes = {
  currentUser: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Locations.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready() && subscription2.ready();
  const locations = Locations.collection.find({}).fetch();
  const currUser = Meteor.user() ? Meteor.user().username : '';
  const currentUser = Users.collection.find({ owner: currUser }).fetch();
  return {
    ready,
    locations,
    currentUser,
  };
})(Forecast);
