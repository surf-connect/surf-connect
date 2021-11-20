import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const style = { marginTop: '200px' };
    return (
      <div id={'landing'}>
        <Container textAlign={'center'} >
          <Header id={'landing-h1'} as={'h1'}>Welcome to Surf Connect!</Header>
          <br/>
          <br/>
          <Grid.Row style={style}>
            <Grid columns={3}>
              <Grid.Column/>
              <Grid.Column>
                {/* eslint-disable-next-line max-len */}
                <Header as={'h2'} id={'root'} >Are you new to surfing and don&apos;t know where to start? Or are you just looking for a surfing buddy to try out a new spot? Use Surf Connect to link with other surfers who can teach you how to surf or who are also looking for a surfing buddy!</Header>
              </Grid.Column>
              <Grid.Column/>
            </Grid>
          </Grid.Row>
          <br/>
          <br/>
          <Grid.Row>
            <Grid columns={3}>
              <Grid.Column/>
              <Grid.Column>
                <Button as={NavLink} to={'/signup'} color={'teal'}>Sign Up</Button>
                <Button as={NavLink} to={'/signin'} color={'violet'}>Sign In</Button>
              </Grid.Column>
              <Grid.Column/>
            </Grid>
          </Grid.Row>
        </Container>
      </div>
    );
  }
}

export default Landing;
