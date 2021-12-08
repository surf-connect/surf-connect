import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Locations } from '../../api/location/Location';

class Forecast extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {
    const style = { marginTop: '50px' };
    return (
      <Container id='forecast-page'>
        <Header as='h1' style={style} textAlign='center'>Oahu Surf Forecast</Header>
        <Table fixed inverted size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Surf Height</Table.HeaderCell>
              <Table.HeaderCell>Tide</Table.HeaderCell>
              <Table.HeaderCell>Wind</Table.HeaderCell>
              <Table.HeaderCell>Swells</Table.HeaderCell>
              <Table.HeaderCell>Weather</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.locations.map(location => <Table.Row style={ { backgroundImage: `url(${(location.image)})`, backgroundSize: 'cover', height: '100px', backgroundPosition: 'center' } } key={location.name}>
              <Table.Cell>{location.name}</Table.Cell>
              <Table.Cell>{location.surf}</Table.Cell>
              <Table.Cell>{location.tide}</Table.Cell>
              <Table.Cell>{location.wind} kts</Table.Cell>
              <Table.Cell>{location.swells} ft</Table.Cell>
              <Table.Cell>{location.weather} &deg;F</Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

Forecast.propTypes = {
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Locations.userPublicationName);
  const ready = subscription.ready();
  const locations = Locations.collection.find({}).fetch();
  return {
    ready,
    locations,
  };
})(Forecast);
