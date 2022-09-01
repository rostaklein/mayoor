export default class Login {
  visit() {
    cy.visit("/");
  }

  getLoginUserName() {
    return cy.get('[data-test-id="login-username"');
  }

  getLoginPassword() {
    return cy.get('[data-test-id="login-password"');
  }

  getLoginButton() {
    return cy.get('[data-test-id="login-submit-button"');
  }

  fullLogin() {
    this.visit();

    this.getLoginUserName().type("admin");
    this.getLoginPassword().type("admin");

    this.getLoginButton().click();
  }
}
