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
  async createProfile(testController, name, image, time, ability, description) {
    const ability1 = '#profile-ability-MQ';
    const ability2 = '#profile-ability-Mg';
    const ability3 = '#profile-ability-Mw';
    const ability4 = '#profile-ability-NA';
    const ability5 = '#profile-ability-NQ';
    const timeSelect = Selector('.ui.selection.dropdown');
    const timeOption = timeSelect.find('option');

    await testController.typeText('#profile-name', name);
    await testController.selectText('#profile-image');
    await testController.typeText('#profile-image', image);
    await testController.click(timeSelect);
    await testController.click(timeOption.withText(time));
    if (ability === 1) {
      await testController.click(ability1);
    } else if (ability === 2) {
      await testController.click(ability2);
    } else if (ability === 3) {
      await testController.click(ability3);
    } else if (ability === 4) {
      await testController.click(ability4);
    } else {
      await testController.click(ability5);
    }
    await testController.typeText('#profile-description', description);
    await testController.click('#profile-create');
    await testController.click('.swal-button-container');
  }

  /** Asserts that this page has a form. */
  async hasForm(testController) {
    await this.isDisplayed(testController);
    const inputCount = Selector('form').count;
    await testController.expect(inputCount).eql(1);
  }
}

export const adduserinfoPage = new AdduserinfoPage();
