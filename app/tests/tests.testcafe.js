import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userPage } from './user.page';
import { adduserinfoPage } from './adduserinfo.page';
import { edituserinfoPage } from './edituserinfo.page';
import { deleteuserinfoPage } from './deleteuserinfo.page';
import { forecastPage } from './forecast.page';
import { connectPage } from './connect.page';
import { suggestionsPage } from './suggestions.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const testuser = { username: 'test@foo.com', password: 'changeme', name: 'New User',
  image: 'https://img.freepik.com/free-vector/man-character-avatar-icon_51635-2890.jpg?size=338&ext=jpg', time: '10:00am', ability: 2, description: 'Lets go surfing' };

const newuser = { username: 'new@foo.com', password: 'changeme', name: 'New User', image: 'https://img.freepik.com/free-vector/man-character-avatar-icon_51635-2890.jpg?size=338&ext=jpg', time: '10:00am', ability: 2, description: 'Lets go surfing' };

fixture('surf-connect localhost test with default db').page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the forecast page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSurflocationsPage(testController);
  await forecastPage.isDisplayed(testController);
  await forecastPage.hasTable(testController);
});

test('Test the user pages and forms', async (testController) => {
  // Tests for users with a profile
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  // Test that users can view their profile
  await navBar.gotoUserPage(testController);
  await userPage.hasTable(testController);
  // Test that users can edit their profile
  await userPage.gotoEdituserPage(testController);
  await edituserinfoPage.hasForm(testController);
  await edituserinfoPage.editProfile(testController, 'Johnny', 'https://i1.sndcdn.com/avatars-000133198400-ercv7n-t500x500.jpg', '3:00pm', 4, 'Looking for people to surf with');
  await navBar.gotoUserPage(testController);
  await userPage.hasTable(testController);
  // Test that users can delete their profile
  await userPage.gotoDeleteuserPage(testController);
  await deleteuserinfoPage.hasForm(testController);
  await deleteuserinfoPage.deleteProfile(testController);
  await navBar.gotoUserPage(testController);
  await adduserinfoPage.hasForm(testController);
  // Add the user profile back to the db
  await adduserinfoPage.createProfile(testController, 'John', 'https://i1.sndcdn.com/avatars-000133198400-ercv7n-t500x500.jpg', '2:00pm', 3, 'Looking for people to surf with');
  await navBar.gotoUserPage(testController);
  await userPage.hasTable(testController);
  await navBar.logout(testController);

  // Tests for users without a profile
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newuser.username, newuser.password);
  // Test that new users can create a profile
  await navBar.gotoUserPage(testController);
  await adduserinfoPage.hasForm(testController);
  await adduserinfoPage.createProfile(testController, newuser.name, newuser.image, newuser.time, newuser.ability, newuser.description);
  // Test that the new profile can be viewed
  await navBar.gotoUserPage(testController);
  await userPage.hasTable(testController);
  // Delete the test profile
  await userPage.gotoDeleteuserPage(testController);
  await deleteuserinfoPage.hasForm(testController);
  await deleteuserinfoPage.deleteProfile(testController);
});

test('Test the connect page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testuser.username, testuser.password);
  await navBar.gotoConnectPage(testController);
  await connectPage.isDisplayed(testController);
  await connectPage.createMessage(testController, 'New Message');
  await connectPage.checkMessages(testController);
});

test('Test the suggestions page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSuggestionsPage(testController);
  await suggestionsPage.isDisplayed(testController);
});
