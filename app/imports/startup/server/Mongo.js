import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Messages } from '../../api/message/Message';
import { Users } from '../../api/user/Users';
import { Locations } from '../../api/location/Location';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addLoc(data) {
  console.log(`Adding Location: ${data.name}`);
  Locations.collection.insert(data);
}

if(Locations.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultLocation.map(data => addLoc(data));
  }
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

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
