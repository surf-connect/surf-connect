import React from 'react';
import { Grid, Header, Form, Button, Image } from 'semantic-ui-react';

export default class User extends React.Component {

  accountData = {
    name: 'john@foo.com',
    password: 'changeme',
    image: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
    ability: '1',
    location: 'Waikiki',
  };

  render() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <Image src={this.accountData.image} size='small'/>
          <Form>
            <Form.Group>
              <Form.Field>
                <label>Profile Picture</label>
                <input value={this.accountData.image}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>Username</label>
                <input value={this.accountData.name}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' value={this.accountData.password}/>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <label>Surfing Ability:</label>
              <Form.Field label='1' control='input' type='radio' name='surfing ability'/>
              <Form.Field label='2' control='input' type='radio' name='surfing ability'/>
              <Form.Field label='3' control='input' type='radio' name='surfing ability'/>
              <Form.Field label='4' control='input' type='radio' name='surfing ability'/>
              <Form.Field label='5' control='input' type='radio' name='surfing ability'/>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>Location</label>
                <input value={this.accountData.location}/>
              </Form.Field>
            </Form.Group>
            <Button.Group>
              <Button positive>Update Account</Button>
              <Button.Or/>
              <Button negative>Delete Account</Button>
            </Button.Group>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
