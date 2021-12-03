import { Meteor } from 'meteor/meteor';
import { surfData } from '../../api/surfline-data/SurfData';

Meteor.startup(() => {
  surfData();
});
