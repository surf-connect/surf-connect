import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Messages } from '../../api/message/Message';
import { Users } from '../../api/user/Users';
import { Locations } from '../../api/location/Location';

// User-level publication.
// Location publication
Meteor.publish(Locations.userPublicationName, function () {
  if (this.userId) {
    return Locations.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    // Finds all Messages that were sent to the user.
    return Messages.collection.find({ receiver: username });
  }
  return this.ready();
});

Meteor.publish(Messages.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Messages.collection.find();
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});
