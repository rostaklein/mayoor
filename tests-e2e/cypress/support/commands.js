const graphqlUrl = Cypress.env("GRAPHQL_URL") || "/graphql";
Cypress.Commands.add("login", () => {
  return cy
    .request("POST", graphqlUrl, {
      operationName: "LoginMutation",
      variables: { email: "admin", password: "admin" },
      query:
        "mutation LoginMutation($email: String!, $password: String!) {login(email: $email, password: $password) {  user {    name    id    email    role    __typename  }  token  __typename}}",
    })
    .its("body")
    .then((response) => {
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
  return cy.callGraphQL({
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
    query:
      "mutation CreateCustomerMutation($input: CreateCustomerInput!) {  createCustomer(input: $input) {    ...CustomerFragment    __typename  }}fragment CustomerFragment on Customer {  id  name  identificationNumber  personName  email  phone  __typename}",
  });
});

Cypress.Commands.add("addMaterial", (materialName) => {
  return cy.callGraphQL({
    operationName: "CreateMaterial",
    variables: { name: materialName || "Banner 510", price: 199 },
    query:
      "mutation CreateMaterial($name: String!, $price: Float!) {  createMaterial(name: $name, price: $price) {    id    name    price    updatedAt    __typename  }}",
  });
});

Cypress.Commands.add("addOrder", () => {
  return cy.addCustomer().then((response) => {
    const customerId = response.body.data.createCustomer.id;
    cy.addMaterial().then((response) => {
      const materialId = response.body.data.createMaterial.id;
      cy.callGraphQL({
        operationName: "GetHighestOrderNumber",
        variables: {},
        query: "query GetHighestOrderNumber {  getHighestOrderNumber}",
      }).then((response) => {
        const newOrderNumber = response.body.data.getHighestOrderNumber;
        cy.callGraphQL({
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
          query:
            "mutation CreateOrder($number: Int!, $input: OrderInput!) {  createOrder(number: $number, input: $input) {    id    number    __typename  }}",
        });
      });
    });
  });
});
