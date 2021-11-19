import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { height: '100px',marginBottom: '0px', backgroundImage: 'url(../images/ocean2.jpg)', backgroundPosition: '50% 80%', backgroundSize: 'cover', fontFamily: 'Original Surfer, cursive' };
    const headerStyle = { fontFamily: 'Original Surfer, cursive' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        {this.props.currentUser ? (<Menu.Item as={NavLink} activeClassName="" exact to="/home">
          <Header inverted as='h2' style={headerStyle}>Surf Connect</Header>
        </Menu.Item>) : (<Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h2' style={headerStyle}>Surf Connect</Header>
        </Menu.Item>)}
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home'>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/locations" key='locations'>Surf Locations</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/connect" key='connect'>Connect</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/suggestions" key='suggestions'>Suggestions</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-user-page" icon="user" text='My Profile' as={NavLink} exact to="/user"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
