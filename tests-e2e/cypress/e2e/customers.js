describe("Customers CRUD", function () {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.login();
  });

  it("should create customer", () => {
    cy.get('[data-test-id="menu-link-item-/customers/new"]').click();
    cy.get('[data-test-id="form-item-name"]').type("Test Customer Name");
    cy.get('[data-test-id="add-customer-submit-button"]').click();
  });

  it("should list and update customer", () => {
    cy.addCustomer("Test Customer Company 1");
    cy.addCustomer("Test Customer Company 2");
    cy.addCustomer("Test Customer Company 3");

    cy.get('[data-test-id="menu-link-item-/customers/list"]').click();
    cy.contains("Test Customer Company 1").click();

    cy.get('[data-test-id="form-item-personName"]').clear().type("Person Name");
    cy.get('[data-test-id="save-customer"]').click();
  });

  it("should delete customer", () => {
    cy.addCustomer("Customer To Get Deleted");
    cy.get('[data-test-id="menu-link-item-/customers/list"]').click();

    cy.contains("Customer To Get Deleted").click();
    cy.get('[data-test-id="customer-delete-button"]').click();
    cy.get(".ant-popconfirm-buttons button:nth-child(2)").click();
  });
});
