import { Selector } from 'testcafe';

class AdduserinfoPage {
  constructor() {
    this.pageId = '#add-user';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Creates a user profile. */
  async createProfile(testController, name, image, description) {
    await testController.typeText('#profile-name', name);
    await testController.typeText('#profile-image', image);
    await testController.typeText('#profile-description', description);
    await testController.click('#profile-create');
  }
}

export const adduserinfoPage = new AdduserinfoPage();
