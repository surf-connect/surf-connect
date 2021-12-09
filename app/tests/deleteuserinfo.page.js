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
    await testController.click('.swal-button-container');
  }

  /** Asserts that this page has a form. */
  async hasForm(testController) {
    await this.isDisplayed(testController);
    const inputCount = Selector('form').count;
    await testController.expect(inputCount).eql(1);
  }
}

export const deleteuserinfoPage = new DeleteuserinfoPage();
