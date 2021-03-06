import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a component that shows a surf suggestion based on the ability prop given. */
class SurfSuggestion extends React.Component {
  render() {
    const segmentStyle = {
      padding: '30px',
      backgroundImage: `url(${this.props.suggestion.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };

    const headerStyle = {
      WebkitTextStroke: '1px black',
    };
    return (
      <Segment id={'suggestion'}>
        <Grid columns={3} style={segmentStyle}>
          <Grid.Column>
            <Header as='h1' style={headerStyle} inverted>{this.props.suggestion.name}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' style={headerStyle} inverted>{`Wave Height: ${this.props.suggestion.surf}`}</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' style={headerStyle} inverted>{`Surf Ability: ${this.props.suggestion.ability}`}</Header>
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
    averageW: PropTypes.number,
    image: PropTypes.string,
    surf: PropTypes.string,
    ability: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(SurfSuggestion);
