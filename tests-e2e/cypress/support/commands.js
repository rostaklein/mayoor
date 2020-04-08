const graphqlUrl = Cypress.env('GRAPHQL_URL') || '/graphql';
Cypress.Commands.add('login', () => {
  return cy
    .request('POST', graphqlUrl, {
      operationName: 'LoginMutation',
      variables: { email: 'admin', password: 'admin' },
      query:
        'mutation LoginMutation($email: String!, $password: String!) {login(email: $email, password: $password) {  user {    name    id    email    role    __typename  }  token  __typename}}',
    })
    .its('body')
    .then((response) => {
      window.localStorage.setItem('auth-token', response.data.login.token);
      cy.visit('/');
      cy.get('[data-test-id="main-body-wrapper"', { timeout: 3000 });
    });
});

Cypress.Commands.add('sendMutation', (body) => {
  const authToken = window.localStorage.getItem('auth-token');
  return cy.request({
    method: 'POST',
    url: graphqlUrl,
    body,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  });
});

Cypress.Commands.add('addCustomer', (companyName) => {
  return cy
    .sendMutation({
      operationName: 'CreateCustomerMutation',
      variables: {
        input: {
          name: companyName || 'Company Inc.',
          identificationNumber: '49842154',
          taxIdentificationNumber: '14587458',
          personName: 'Jack Smith',
          phone: '741 852 963',
          email: 'email@somewhere.com',
          note: 'Long customer note',
          allowedBankPayments: false,
          addresses: [
            {
              isPrimary: true,
              street: 'Somewhere',
              city: 'Wherever',
              postNumber: '123',
            },
            {
              isPrimary: false,
              street: 'Somewhere',
              city: 'Wherever',
              postNumber: '123',
            },
          ],
        },
      },
      query:
        'mutation CreateCustomerMutation($input: CreateCustomerInput!) {  createCustomer(input: $input) {    ...CustomerFragment    __typename  }}fragment CustomerFragment on Customer {  id  name  identificationNumber  personName  email  phone  __typename}',
    })
    .its('body')
    .then((response) => {
      cy.log(response);
      cy.log(JSON.stringify(response));
    });
});
