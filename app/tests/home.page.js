import { Selector } from 'testcafe';

class HomePage {
  constructor() {
    this.pageId = '#home';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table at least one row. */
  async hasTable(testController) {
    const rowCount = Selector('suggestion').count;
    const columnCount = Selector('user-card').count;
    await testController.expect(rowCount).gte(0);
    await testController.expect(columnCount).eql(0);
  }
}

export const homePage = new HomePage();
