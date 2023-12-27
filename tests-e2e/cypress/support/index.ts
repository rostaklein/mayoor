declare namespace Cypress {
  interface Chainable {
    login(): void;
    callGraphQL<T = unknown>(
      body: Cypress.RequestBody
    ): Cypress.Chainable<Cypress.Response<T>>;
    addCustomer<T = unknown>(
      companyName?: string
    ): Cypress.Chainable<Cypress.Response<T>>;
    addMaterial<T = unknown>(
      materialName?: string
    ): Cypress.Chainable<Cypress.Response<T>>;
    addOrder<T = unknown>(): Cypress.Chainable<Cypress.Response<T>>;
  }
}
