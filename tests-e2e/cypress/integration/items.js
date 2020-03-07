import HomePage from '../pages/home';

describe('Items Test', function() {
  beforeEach(function() {
    cy.viewport('macbook-15');
  });

  it('Removes All Items', function() {
    const homePage = new HomePage();
    homePage.visit();

    const itemsRemovalCTA = homePage.getItemsRemovalCTA();
    itemsRemovalCTA.click();

    const emptyStateEl = homePage.getEmptyStateEl();
    emptyStateEl.contains('There are no items');
  });
});
