import React from 'react';
import { Grid, Header, Form, Button, Image, Input, Confirm } from 'semantic-ui-react';

export default class User extends React.Component {

  accountData = {
    name: 'john@foo.com',
    password: 'changeme',
    image: 'https://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2-768x768.jpeg',
    ability: '1',
    location: 'Waikiki',
    description: 'Hello',
  };

  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  render() {
    return (
      <Grid container centered>
        <Grid.Row>
          <Header as="h1" textAlign="center">Edit Profile</Header>
        </Grid.Row>
        <Grid.Row>
          <Image src={this.accountData.image} size='small' avatar/>
        </Grid.Row>
        <Grid.Row>
          <Form>
            <Form.Field>
              <label>Profile Picture</label>
              <Input defaultValue={this.accountData.image}/>
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <label>Email</label>
                <Input defaultValue={this.accountData.name}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input type='password' defaultValue={this.accountData.password}/>
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <label>Surfing Ability:</label>
              <Form.Field label='1' control='input' type='radio' name='surfing ability' defaultChecked={this.accountData.ability === '1'}/>
              <Form.Field label='2' control='input' type='radio' name='surfing ability' defaultChecked={this.accountData.ability === '2'}/>
              <Form.Field label='3' control='input' type='radio' name='surfing ability' defaultChecked={this.accountData.ability === '3'}/>
              <Form.Field label='4' control='input' type='radio' name='surfing ability' defaultChecked={this.accountData.ability === '4'}/>
              <Form.Field label='5' control='input' type='radio' name='surfing ability' defaultChecked={this.accountData.ability === '5'}/>
            </Form.Group>
            <Form.Field>
              <label>Location</label>
              <Input defaultValue={this.accountData.location}/>
            </Form.Field>
            <Form.TextArea label='Description' defaultValue={this.accountData.description}/>
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
