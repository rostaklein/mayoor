import {
  LoginMutationDocument,
  CreateCustomerMutationDocument,
  CreateMaterialDocument,
  LoginMutationMutationResult,
  CreateCustomerMutationMutationResult,
  CreateMaterialMutationResult,
  GetHighestOrderNumberDocument,
  GetHighestOrderNumberQueryResult,
  CreateOrderDocument,
  CreateOrderMutationResult,
} from "./__generated__/queries.generated";

const graphqlUrl = Cypress.env("GRAPHQL_URL") || "/graphql";

Cypress.Commands.add("login", () => {
  return cy
    .request("POST", graphqlUrl, {
      operationName: "LoginMutation",
      variables: { email: "admin", password: "admin" },
      query: LoginMutationDocument,
    })
    .its("body")
    .then((response: LoginMutationMutationResult) => {
      window.localStorage.setItem("auth-token", response.data.login.token);
      cy.visit("/");
      cy.get('[data-test-id="main-body-wrapper"', { timeout: 3000 });
    });
});

Cypress.Commands.add("callGraphQL", (body) => {
  const authToken = window.localStorage.getItem("auth-token");
  return cy.request({
    method: "POST",
    url: graphqlUrl,
    body,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  });
});

Cypress.Commands.add("addCustomer", (companyName) => {
  return cy.callGraphQL<CreateCustomerMutationMutationResult>({
    operationName: "CreateCustomerMutation",
    variables: {
      input: {
        name: companyName || "Company Inc.",
        identificationNumber: "49842154",
        taxIdentificationNumber: "14587458",
        personName: "Jack Smith",
        phone: "741 852 963",
        email: "email@somewhere.com",
        note: "Long customer note",
        allowedBankPayments: false,
        addresses: [
          {
            isPrimary: true,
            street: "Somewhere",
            city: "Wherever",
            postNumber: "123",
          },
          {
            isPrimary: false,
            street: "Somewhere",
            city: "Wherever",
            postNumber: "123",
          },
        ],
      },
    },
    query: CreateCustomerMutationDocument,
  });
});

Cypress.Commands.add("addMaterial", (materialName) => {
  return cy.callGraphQL({
    operationName: "CreateMaterial",
    variables: { name: materialName || "Banner 510", price: 199 },
    query: CreateMaterialDocument,
  });
});

Cypress.Commands.add("addOrder", () => {
  return cy
    .addCustomer<CreateCustomerMutationMutationResult>()
    .then((response) => {
      const customerId = response.body.data.createCustomer.id;
      cy.addMaterial<CreateMaterialMutationResult>().then((response) => {
        const materialId = response.body.data.createMaterial.id;
        cy.callGraphQL<GetHighestOrderNumberQueryResult>({
          operationName: "GetHighestOrderNumber",
          variables: {},
          query: GetHighestOrderNumberDocument,
        }).then((response) => {
          const newOrderNumber = response.body.data.getHighestOrderNumber;
          return cy.callGraphQL<CreateOrderMutationResult>({
            operationName: "CreateOrder",
            variables: {
              number: newOrderNumber + 1,
              input: {
                urgency: 1,
                status: "NEW",
                customerId,
                totalPrice: 200,
                totalTax: 20,
                note: "",
                items: [
                  {
                    materialId,
                    name: "test",
                    pieces: 1,
                    width: 2,
                    height: 1,
                    totalPrice: 100,
                    totalTax: 20,
                  },
                ],
              },
            },
            query: CreateOrderDocument,
          });
        });
      });
    });
});
