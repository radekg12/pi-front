import {browser, by, element, promise} from 'protractor';

export class AppPage {
  navigateTo(url?: string) {
    return browser.get(url ? `/${url}` : '/');
  }

  getParagraphText(className: string) {
    return element(by.className(className)).getText();
  }

  getElementByCss(cssSelector: string) {
    return element(by.css(cssSelector));
  }

  getTextByElementTag(tagName: string) {
    return element(by.tagName(tagName)).getText();
  }

  fillLoginForm(username: string, password: string) {
    this.getElementByCss('[placeholder = "Hasło"]').sendKeys(password);
    this.getElementByCss('[placeholder = "Login"]').sendKeys(username);
    element(by.css('.button-primary')).click();
  }

  getCurrentUrl(): promise.Promise<string> {
    return browser.getCurrentUrl();
  }
}
