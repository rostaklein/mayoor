describe('Orders CRUD', function () {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

  it('should create new order', () => {
    cy.addCustomer('Test Order Customer Company 1');
    cy.addMaterial('Banner 550');

    //assign customer
    cy.get('[data-test-id="menu-link-item-/orders/new"]').click();
    cy.get('[data-test-id="customer-picker"]').click().type('Test Order');
    cy.wait(500);
    cy.contains('Test Order Customer Company 1').click();

    //configure an item
    cy.get('[data-test-id="items.0.materialId"]').click();
    cy.contains('Banner 550').click();
    cy.get('[data-test-id="form-item-items.0.name"]')
      .clear()
      .type('test item name');
    cy.get('[data-test-id="form-item-items.0.width"]').clear().type('5');
    cy.get('[data-test-id="form-item-items.0.height"]').clear().type('1.2');
    cy.get('[data-test-id="form-item-items.0.pieces"]').clear().type('3');

    //calculate order
    cy.get('[data-test-id="items.0-calculate-button"]').click();
    cy.get('[data-test-id="order-sum-items-button"]').click();

    //submit
    cy.get('[data-test-id="add-order-submit-button"]').click();
  });

  it('should list and update orders', () => {
    cy.addOrder();
    cy.addOrder();
    cy.addOrder();

    //list
    cy.get('[data-test-id="menu-link-item-/orders/list"]').click();
    cy.get('[data-test-id="order-list-go-to-button-0"]').click();

    //update
    cy.get('[data-test-id="order-form-note"]').type('Edited this order');
    cy.get('[data-test-id="save-order-submit-button"]').click();
  });

  it('should delete order', () => {
    cy.addOrder();
    cy.get('[data-test-id="menu-link-item-/orders/list"]').click();
    cy.get('[data-test-id="order-list-go-to-button-0"]').click();

    cy.get('[data-test-id="order-delete-button"]').click();
    cy.get('.ant-popover-buttons button:nth-child(2)').click();
  });
});
