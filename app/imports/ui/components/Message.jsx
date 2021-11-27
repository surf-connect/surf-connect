import React from 'react';
import { Accordion, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SendMessage from './SendMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  constructor() {
    super();
    this.replyClicked = false;
  }

  state = { activeState: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    let newIndex = index;
    if (activeIndex === index) {
      newIndex = -1;
    }
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Segment>
        <Grid columns='2'>
          <Grid.Column>
            <Header as='h3'>{`From: ${this.props.message.sender}`}</Header>
          </Grid.Column>
          <Grid.Column>
            <Image size='tiny' src={this.props.message.image} />
          </Grid.Column>
        </Grid>
        <Divider />
        <p>{this.props.message.message}</p>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick} >
            Reply To Message
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0} >
            <SendMessage key={this.props.message._id} receiver={this.props.message.sender} />
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string,
    image: PropTypes.string,
    receiver: PropTypes.string,
    message: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default withRouter(Message);
