import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/message/Message';
import { Users } from '../../api/user/Users';

/* eslint-disable no-console */

function addMessage(message) {
  console.log(`  Adding: ${message.message} (${message.sender})`);
  Messages.collection.insert(message);
}

if (Messages.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default messages.');
    Meteor.settings.defaultMessages.map(message => addMessage(message));
  }
}

function addUser(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Users.collection.insert(data);
}

if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default users.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
  }
}
