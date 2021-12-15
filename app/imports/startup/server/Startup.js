import { Meteor } from 'meteor/meteor';
import { updateSurfData } from '../../api/surfline-api-calls/UpdateSurfData';

/** Gets all data from API and updates surf forecasts for each location. */
Meteor.startup(() => {
  updateSurfData('Sunset Beach', 'Sunset Beach', 'https://www.best-of-oahu.com/images/Sunset-Beach-Oahu-2.jpg');
  updateSurfData('Makaha Beach', 'Makaha Beach', 'https://honoluluairporttransfer.com/wp-content/uploads/2019/03/honolulu_airport_to_makaha-870x545.jpg');
  updateSurfData('Haleʻiwa Beach', 'Haleʻiwa Beach', 'https://www.aloha-hawaii.com/wp-content/uploads/2010/07/haleiwa-beach-park.jpg');
  updateSurfData('Laniakea', 'Laniakea Beach', 'https://www.best-of-oahu.com/images/Laniakea-Beach-2.jpg');
  updateSurfData('Queens', 'Waikiki - Queens', 'https://www.gohawaii.com/sites/default/files/styles/image_gallery_bg_xl/public/hero-unit-images/OahuQueensBeachWaikiki_LynnImage.jpg?itok=Pe_uYITJ');
  updateSurfData('Nanakuli Beach', 'Nanakuli Beach', 'http://www.onlyinyourstate.com/wp-content/uploads/2017/05/Nanakuli-9.jpg');
  updateSurfData('Waimea', 'Waimea Bay', 'https://www.best-of-oahu.com/images/xWaimea-Bay-Hawaii.jpg.pagespeed.ic.yfWUlSbrXr.jpg');
  updateSurfData('Pipeline', 'Waimea Bay', 'https://media-cdn.tripadvisor.com/media/photo-s/16/fc/15/cf/beach.jpg');
  updateSurfData('Sandy Beach', 'Sandy Beach', 'https://www.fodors.com/assets/destinations/58227/sandy-beach-honolulu-and-oahu-oahu-hawaii-usa_main.jpg');
});
