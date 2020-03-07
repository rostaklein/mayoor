export default class HomePage {
  visit() {
    cy.visit('/');
  }

  getItemsRemovalCTA() {
    return cy.get('[data-test-id="items-removal-cta"');
  }

  getEmptyStateEl() {
    return cy.get('[data-test-id="item-empty-state"');
  }
}
