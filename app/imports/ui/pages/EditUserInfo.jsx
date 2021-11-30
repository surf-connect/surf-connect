import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/user/Users';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditUserInfo extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, image, description, time, ability, _id } = data;
    Users.collection.update(_id, { $set: { name, image, description, time, ability } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id='edit-profile-page' container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Your Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id='edit-profile-name' name='name' showInlineError={true}/>
              <TextField id='edit-profile-image' name='image' showInlineError={true}/>
              <SelectField id='edit-profile-time' name='time' showInlineError={true}/>
              <RadioField id='edit-profile-ability' name='ability' showInlineError={true}/>
              <LongTextField id='edit-profile-description' name='description' showInlineError={true}/>
              <SubmitField id='confirm-edit-profile' value='Update'/>
              <ErrorsField/>
            </Segment>
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
