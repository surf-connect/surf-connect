import { Meteor } from 'meteor/meteor';
import { surfData } from '../../api/surfline-data/SurfData';

Meteor.startup(() => {
  surfData('5842041f4e65fad6a770888d', 'Sunset Beach');
  surfData('5842041f4e65fad6a7708e30', 'Sand Island');
  surfData('5842041f4e65fad6a7708df5', 'Haleiwa');
  surfData('5842041f4e65fad6a7708898', 'Laniakea');
  surfData('5842041f4e65fad6a7708df8', 'Mokuleia');
  surfData('5842041f4e65fad6a7708dfe', 'Barbers Point');
  surfData('5842041f4e65fad6a7708895', 'Waimea Bay');
  surfData('5842041f4e65fad6a7708890', 'Pipeline');
  surfData('5842041f4e65fad6a7708df6', 'Sandy Beach');
});
