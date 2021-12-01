import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Messages } from '../../api/message/Message';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a form where the user can type in and submit as a message to another user. */
class SendMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { message } = data;
    const owner = Meteor.user().username;
    // Inserts a new Message document with the specified receiver and sender.
    Messages.collection.insert({ sender: owner, receiver: this.props.receiver,
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VyZmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80', message: message }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', `${this.props.messageType} Sent to ${this.props.receiver}!`, 'success');
        formRef.reset();
      }
    });
  }

  render() {
    let fRef = null;
    return (
      <Container>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Segment>
            <TextField name='message' id='message-form' />
            <SubmitField value={this.props.messageType} id='send-message' />
            <ErrorsField/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
SendMessage.propTypes = {
  receiver: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default withRouter(SendMessage);
