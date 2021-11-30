import { Selector } from 'testcafe';

class EdituserinfoPage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Creates a user profile. */
  async editProfile(testController, name, image, description) {
    await testController.selectText('#edit-profile-name');
    await testController.typeText('#edit-profile-name', name);
    await testController.selectText('#edit-profile-image');
    await testController.typeText('#edit-profile-image', image);
    await testController.selectText('#edit-profile-description');
    await testController.typeText('#edit-profile-description', description);
    await testController.click('#confirm-edit-profile');
  }
}

export const edituserinfoPage = new EdituserinfoPage();
