import { Selector } from 'testcafe';

class DeleteuserinfoPage {
  constructor() {
    this.pageId = '#delete-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Clicks on the delete profile button. */
  async deleteProfile(testController) {
    await testController.click('#confirm-delete-profile');
  }
}

export const deleteuserinfoPage = new DeleteuserinfoPage();
