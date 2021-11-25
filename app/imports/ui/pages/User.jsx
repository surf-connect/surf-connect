import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image, Table, Button, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/Users';

class User extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      // Look for user's profile in the collection.
      (Users.collection.find({}).count() === 0) ? (
        // If no profile is found, redirect user to AddUserInfo page.
        <Redirect to='/add'/>
      ) : (
        // If a profile is found, display profile information.
        <Grid container centered>
          <Grid.Row>
            <Header as='h1' textAlign='center'>My Profile</Header>
          </Grid.Row>
          <Grid.Row>
            <Image size='medium' src={this.props.userInfo[0].image} avatar/>
          </Grid.Row>
          <Grid.Row>
            <Header as='h2' textAlign='center'>{this.props.userInfo[0].name}</Header>
          </Grid.Row>
          <Grid.Row>
            <Table fixed celled striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Header as='h3'>Email</Header></Table.Cell>
                  <Table.Cell>{this.props.userInfo[0].owner}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header as='h3'>Preferred Time</Header></Table.Cell>
                  <Table.Cell>{this.props.userInfo[0].time}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header as='h3'>Surfing Ability</Header></Table.Cell>
                  <Table.Cell>{this.props.userInfo[0].ability}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header as='h3'>Description</Header></Table.Cell>
                  <Table.Cell>{this.props.userInfo[0].description}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Row>
          <Button.Group>
            <div>
              <Button positive as={NavLink} to={`/edit/${this.props.userInfo[0]._id}`}>Edit Profile</Button>
            </div>
            <Button.Or/>
            <div>
              <Button negative as={NavLink} to={`/delete/${this.props.userInfo[0]._id}`}>Delete Profile</Button>
            </div>
          </Button.Group>
        </Grid>
      )
    );
  }
}

// Require an array of Stuff documents in the props.
User.propTypes = {
  userInfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const userInfo = Users.collection.find({}).fetch();
  return {
    userInfo,
    ready,
  };
})(User);
