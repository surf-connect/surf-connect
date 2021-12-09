import { Selector } from 'testcafe';

class ForecastPage {
  constructor() {
    this.pageId = '#forecast-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table at least one row. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    const columnCount = Selector('th').count;
    await testController.expect(rowCount).gte(1);
    await testController.expect(columnCount).eql(6);
  }
}

export const forecastPage = new ForecastPage();
