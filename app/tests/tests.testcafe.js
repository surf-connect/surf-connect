import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userPage } from './user.page';
import { adduserinfoPage } from './adduserinfo.page';
import { edituserinfoPage } from './edituserinfo.page';
import { deleteuserinfoPage } from './deleteuserinfo.page';
import { forecastPage } from './forecast.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const newuser = { username: 'test@foo.com', password: 'changeme', name: 'New User', image: 'https://img.freepik.com/free-vector/man-character-avatar-icon_51635-2890.jpg?size=338&ext=jpg', description: 'Lets go surfing' };

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

test('Test the user page (for users with a profile)', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserPage(testController);
  await userPage.isDisplayed(testController);
  await userPage.hasTable(testController);
});

test('Test the adduserinfo and user pages (for users without a profile)', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newuser.username, newuser.password);
  await navBar.gotoUserPage(testController);
  await adduserinfoPage.isDisplayed(testController);
  await adduserinfoPage.createProfile(testController, newuser.name, newuser.image, newuser.description);
});

test('Test the edituserinfo page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newuser.username, newuser.password);
  await navBar.gotoUserPage(testController);
  await userPage.gotoEdituserPage(testController);
  await edituserinfoPage.isDisplayed(testController);
  await edituserinfoPage.editProfile(testController, 'Johnny', 'https://i1.sndcdn.com/avatars-000133198400-ercv7n-t500x500.jpg', 'Looking for people to surf with');
});

test('Test the deleteuserinfo page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newuser.username, newuser.password);
  await navBar.gotoUserPage(testController);
  await userPage.gotoDeleteuserPage(testController);
  await deleteuserinfoPage.isDisplayed(testController);
  await deleteuserinfoPage.deleteProfile(testController);
  await navBar.gotoUserPage(testController);
  await adduserinfoPage.isDisplayed(testController);
});
