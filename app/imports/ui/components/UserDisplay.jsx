import React from 'react';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserDisplay extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.user.name}</Card.Header>
          <Card.Meta>{this.props.user.time}</Card.Meta>
        </Card.Content>
        <Image src={this.props.user.image} />
        <Card.Content>
          <Card.Meta>{`Surf Ability Level: ${this.props.user.ability}`}</Card.Meta>
          <Card.Description>{this.props.user.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='two ui buttons'>
            <Button animated basic color='red'>
              <Button.Content visible>
                <Icon name='like' />
              </Button.Content>
              <Button.Content hidden>
                Like profile
              </Button.Content>
            </Button>
            <Button animated basic color='blue'>
              <Button.Content visible>
                <Icon name='chat' />
              </Button.Content>
              <Button.Content hidden>
                Message user
              </Button.Content>
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserDisplay.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    time: PropTypes.string,
    ability: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(UserDisplay);
