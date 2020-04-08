import Login from '../pages/login';

describe('Login flow', () => {
  before(() => {
    cy.wait(2000);
  });
  beforeEach(() => {
    cy.viewport('macbook-15');
  });

  it('can login', () => {
    const login = new Login();
    login.visit();

    login.getLoginUserName().type('admin');
    login.getLoginPassword().type('admin');

    login.getLoginButton().click();
  });
});
