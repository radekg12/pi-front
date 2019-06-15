import { AppPage } from './app.po';

describe('workspace-project HurtpolApp', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText('text-title')).toEqual('Hurtownia sprzętu komputerowego');
  });

  it('should display warning message after unsuccessful login', () => {
    page.navigateTo('login');
    page.fillLoginForm('jan.kowalski@mail.com', 'PasswordXYZ')
    expect(page.getTextByElementTag('mat-error')).toEqual('Email lub hasło jest niepoprawne. Spróbuj jeszcze raz')
  })

  it('should display redirect to home page after successful login', () => {
    page.navigateTo('login');
    page.fillLoginForm('jan.kowalski@mail.com', 'Password1!')
    page.getCurrentUrl().then(url => {
      const elements = url.split('/')
      url = elements[elements.length-1]
      expect(url).toEqual('home')
    })
  })


});
