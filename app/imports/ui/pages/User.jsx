import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Form, Button, Image, Input, Confirm, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/Users';

class User extends React.Component {

  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const timeOptions = [
      { key: '12:00am', text: '12:00am', value: '12:00am' },
      { key: '1:00am', text: '1:00am', value: '1:00am' },
      { key: '2:00am', text: '2:00am', value: '2:00am' },
      { key: '3:00am', text: '3:00am', value: '3:00am' },
      { key: '4:00am', text: '4:00am', value: '4:00am' },
      { key: '5:00am', text: '5:00am', value: '5:00am' },
      { key: '6:00am', text: '6:00am', value: '6:00am' },
      { key: '7:00am', text: '7:00am', value: '7:00am' },
      { key: '8:00am', text: '8:00am', value: '8:00am' },
      { key: '9:00am', text: '9:00am', value: '9:00am' },
      { key: '10:00am', text: '10:00am', value: '10:00am' },
      { key: '11:00am', text: '11:00am', value: '11:00am' },
      { key: '12:00pm', text: '12:00pm', value: '12:00pm' },
      { key: '1:00pm', text: '1:00pm', value: '1:00pm' },
      { key: '2:00pm', text: '2:00pm', value: '2:00pm' },
      { key: '3:00pm', text: '3:00pm', value: '3:00pm' },
      { key: '4:00pm', text: '4:00pm', value: '4:00pm' },
      { key: '5:00pm', text: '5:00pm', value: '5:00pm' },
      { key: '6:00pm', text: '6:00pm', value: '6:00pm' },
      { key: '7:00pm', text: '7:00pm', value: '7:00pm' },
      { key: '8:00pm', text: '8:00pm', value: '8:00pm' },
      { key: '9:00pm', text: '9:00pm', value: '9:00pm' },
      { key: '10:00pm', text: '10:00pm', value: '10:00pm' },
      { key: '11:00pm', text: '11:00pm', value: '11:00pm' },
    ];
    return (
      <Grid container centered>
        <Grid.Row>
          <Header as="h1" textAlign="center">Edit Profile</Header>
        </Grid.Row>
        <Grid.Row>
          <Image src={this.props.userInfo[0].image} size='small' avatar/>
        </Grid.Row>
        <Grid.Row>
          <Form>
            <Form.Field>
              <label>Profile Picture</label>
              <Input defaultValue={this.props.userInfo[0].image}/>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <Input defaultValue={this.props.userInfo[0].name}/>
            </Form.Field>
            <Form.Select
              label='Preferred Time'
              options={timeOptions}
              defaultValue={this.props.userInfo[0].time}
            />
            <Form.Group inline>
              <label>Surfing Ability:</label>
              <Form.Field label='1' control='input' type='radio' name='surfing ability' defaultChecked={this.props.userInfo[0].ability === 1}/>
              <Form.Field label='2' control='input' type='radio' name='surfing ability' defaultChecked={this.props.userInfo[0].ability === 2}/>
              <Form.Field label='3' control='input' type='radio' name='surfing ability' defaultChecked={this.props.userInfo[0].ability === 3}/>
              <Form.Field label='4' control='input' type='radio' name='surfing ability' defaultChecked={this.props.userInfo[0].ability === 4}/>
              <Form.Field label='5' control='input' type='radio' name='surfing ability' defaultChecked={this.props.userInfo[0].ability === 5}/>
            </Form.Group>
            <Form.TextArea label='Description' defaultValue={this.props.userInfo[0].description}/>
            <Button.Group>
              <div>
                <Button positive>Update Profile</Button>
              </div>
              <Button.Or/>
              <div>
                <Button negative onClick={this.open}>Delete Profile</Button>
                <Confirm
                  open={this.state.open}
                  onCancel={this.close}
                  onConfirm={this.close}/>
              </div>
            </Button.Group>
          </Form>
        </Grid.Row>
      </Grid>
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
