import Login from '../pages/login';

describe('Login flow', function () {
  beforeEach(function () {
    cy.viewport('macbook-15');
  });

  it('can login', function () {
    const login = new Login();
    login.visit();

    login.getLoginUserName().type('admin');
    login.getLoginPassword().type('admin');

    login.getLoginButton().click();
  });
});
