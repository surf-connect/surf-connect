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
  async editProfile(testController, name, image, time, ability, description) {
    const ability1 = '#edit-profile-ability-MQ';
    const ability2 = '#edit-profile-ability-Mg';
    const ability3 = '#edit-profile-ability-Mw';
    const ability4 = '#edit-profile-ability-NA';
    const ability5 = '#edit-profile-ability-NQ';
    const timeSelect = Selector('.ui.selection.dropdown');
    const timeOption = timeSelect.find('option');

    await testController.selectText('#edit-profile-name');
    await testController.typeText('#edit-profile-name', name);
    await testController.selectText('#edit-profile-image');
    await testController.typeText('#edit-profile-image', image);
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
    await testController.click('#edit-profile-ability-NA');
    await testController.selectText('#edit-profile-description');
    await testController.typeText('#edit-profile-description', description);
    await testController.click('#confirm-edit-profile');
    await testController.click('.swal-button-container');
  }

  /** Asserts that this page has a form. */
  async hasForm(testController) {
    await this.isDisplayed(testController);
    const inputCount = Selector('form').count;
    await testController.expect(inputCount).eql(1);
  }
}

export const edituserinfoPage = new EdituserinfoPage();
