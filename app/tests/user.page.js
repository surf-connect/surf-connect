import { Selector } from 'testcafe';

class UserPage {
  constructor() {
    this.pageId = '#user';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table with four rows. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(4);
  }

  /** Clicks on the edit profile button. */
  async gotoEdituserPage(testController) {
    await testController.click('#edit-user');
  }

  /** Clicks on the delete profile button. */
  async gotoDeleteuserPage(testController) {
    await testController.click('#delete-user');
  }
}

export const userPage = new UserPage();
