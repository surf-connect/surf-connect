import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class LandingPage {
  constructor() {
    this.pageId = '#landing';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(25000).expect(this.pageSelector.exists).ok();
  }

  /** Creates a profile for the test user and checks that the user page is displayed. */
  async signupUser(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const landingPage = new LandingPage();
