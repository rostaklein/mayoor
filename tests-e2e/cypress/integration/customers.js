import Login from '../pages/login';

describe('Customers CRUD', function () {
  const login = new Login();

  beforeEach(function () {
    cy.viewport('macbook-15');
  });

  before(() => {
    login.visit();

    login.getLoginUserName().type('admin');
    login.getLoginPassword().type('admin');

    login.getLoginButton().click();
  });

  it('should create, list, update and delete customer', () => {
    cy.get('[data-test-id="menu-link-item-/customers/new"]').click();
    cy.get('[data-test-id="form-item-name"]').type('Test Customer Name');
    cy.get('[data-test-id="add-customer-submit-button"]').click();

    //list
    cy.get('[data-test-id="menu-link-item-/customers/list"]').click();
    cy.contains('Test Customer Name').click();

    //update
    cy.get('[data-test-id="form-item-personName"]').type('Person Name');
    cy.get('[data-test-id="save-customer"]').click();

    //delete
    cy.get('[data-test-id="menu-link-item-/customers/list"]').click();
    cy.contains('Test Customer Name').click();
    cy.get('[data-test-id="customer-delete-button"]').click();
    cy.get('.ant-popover-buttons button:nth-child(2)').click();
  });
});
