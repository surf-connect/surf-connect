import { Selector } from 'testcafe';

class SuggestionsPage {
  constructor() {
    this.pageId = '#suggestion-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the number of suggestions for the user is greater than or equal to 1. */
  async correctSuggestions(testController) {
    const suggestionsCount = Selector('h2').count;
    await testController.expect(suggestionsCount).gte(1);
  }
}

export const suggestionsPage = new SuggestionsPage();
