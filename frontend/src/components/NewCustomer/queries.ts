import gql from 'graphql-tag';

export const CREATE_CUSTOMER_MUTATION = gql`
	mutation CreateCustomerMutation($input: CreateCustomerInput!) {
		createCustomer(input: $input) {
			name
			personName
			identificationNumber
		}
	}
`;
