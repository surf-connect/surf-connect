import { Selector } from 'testcafe';

class ConnectPage {
  constructor() {
    this.pageId = '#connect-page';
    this.pageSelector = Selector(this.pageId);
    this.username = 'User1@gmail.com';
    this.password = '123';
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Creates a message and sends it. */
  async createMessage(testController, message) {
    await testController.click('#message-click');
    await testController.typeText('#message-form', message);
    await testController.click('#send-message');
  }

  /** Checks if the correct message appears in the test user's messages. */
  async checkMessages(testController) {
    await testController.click('#user-messages');
    const numberOfMessages = Selector('p').withText('Whats up bro!').count;
    await testController.expect(numberOfMessages).eql(1);
  }
}

export const connectPage = new ConnectPage();
