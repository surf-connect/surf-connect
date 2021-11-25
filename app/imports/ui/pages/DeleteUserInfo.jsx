import React from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/user/Users';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditUserInfo extends React.Component {

  // On confirm, remove the data.
  confirm(data) {
    const { name, image, description, time, ability, _id } = data;
    Users.collection.remove(_id, { $set: { name, image, description, time, ability } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile deleted successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column textAlign="center">
          <Header as="h2">Delete Profile</Header>
          <Header as="h3">Are you sure you want to delete your profile?</Header>
          <AutoForm schema={bridge} onSubmit={data => this.confirm(data)} model={this.props.doc}>
            <SubmitField value='Confirm'/>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a User document in the props object. Uniforms adds 'model' to the props, which we use.
EditUserInfo.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditUserInfo);
