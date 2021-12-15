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
import { homePage } from './home.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const testuser = { username: 'test@foo.com', password: 'changeme', name: 'New User',
  image: 'https://img.freepik.com/free-vector/man-character-avatar-icon_51635-2890.jpg?size=338&ext=jpg', time: '10:00am', ability: 2, description: 'Lets go surfing' };

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
test('Test the home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHomePage(testController);
  await homePage.isDisplayed(testController);
  await homePage.hasTable(testController);
});
test('Test the forecast page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSurflocationsPage(testController);
  await forecastPage.isDisplayed(testController);
  await forecastPage.hasTable(testController);
});

test('Test the user pages and forms', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testuser.username, testuser.password);
  // test the user page
  await navBar.gotoUserPage(testController);
  await userPage.isDisplayed(testController);
  await userPage.hasTable(testController);
  // test the edit form
  await userPage.gotoEdituserPage(testController);
  await edituserinfoPage.isDisplayed(testController);
  await edituserinfoPage.hasForm(testController);
  await edituserinfoPage.editProfile(testController, testuser.name, testuser.image, testuser.time, testuser.ability, testuser.description);
  // test the delete form
  await navBar.gotoUserPage(testController);
  await userPage.gotoDeleteuserPage(testController);
  await deleteuserinfoPage.isDisplayed(testController);
  await deleteuserinfoPage.hasForm(testController);
  await deleteuserinfoPage.deleteProfile(testController);
  // test the add form
  await navBar.gotoUserPage(testController);
  await adduserinfoPage.isDisplayed(testController);
  await adduserinfoPage.hasForm(testController);
  await adduserinfoPage.createProfile(testController, 'Billy Jeans', 'https://img.freepik.com/free-vector/man-character-avatar-icon_51635-2890.jpg?size=338&ext=jpg', '12:00pm', '1', 'Hello my name is Billy!');
});

test('Test the connect page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testuser.username, testuser.password);
  await navBar.gotoConnectPage(testController);
  await connectPage.isDisplayed(testController);
  await connectPage.createMessage(testController, 'New Message');
});

test('Test the suggestions page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, testuser.username, testuser.password);
  await navBar.gotoSuggestionsPage(testController);
  await suggestionsPage.isDisplayed(testController);
});
