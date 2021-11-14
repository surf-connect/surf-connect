import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SurfSuggestion extends React.Component {
  render() {
    return (
      <Segment>
        <Grid columns={3}>
          <Grid.Column>
            <Header as='h2'>{this.props.suggestion.name}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h4'>{`Average Wave Height: ${this.props.suggestion.waveHeight}`}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h4'>{`Surf Ability: ${this.props.suggestion.ability}`}</Header>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

// Require a document to be passed to this component.
SurfSuggestion.propTypes = {
  suggestion: PropTypes.shape({
    name: PropTypes.string,
    waveHeight: PropTypes.string,
    ability: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(SurfSuggestion);
