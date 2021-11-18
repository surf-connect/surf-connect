import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container textAlign={'center'} >
        <Header id={'landing-font'} as={'h1'}>Welcome to Surf Connect!</Header>
        <br/>
        <br/>
        <Grid columns={3} >
          <Grid.Column/>
          <Grid.Column>
            <Header as={'h3'} id={'root'} >Are you new to surfing and don&apos;t know where to start? Or are you just looking for a surfing buddy to try out a new spot? Use Surf Connect to link with other surfers who can teach you how to surf or who are also looking for a surfing buddy!</Header>
          </Grid.Column>
          <Grid.Column/>
        </Grid>
      </Container>
    );
  }
}

export default Landing;
