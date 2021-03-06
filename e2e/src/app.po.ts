import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): unknown {
    return browser.get(browser.baseUrl);
  }

  getTitleText(): string {
    return element(by.css('app-root .container h1')).getText();
  }
}
