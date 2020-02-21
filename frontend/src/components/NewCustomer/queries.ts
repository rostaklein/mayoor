import gql from 'graphql-tag';

export const CREATE_CUSTOMER_MUTATION = gql`
	mutation CreateCustomerMutation(
		$name: String
		$personName: String
		$identificationNumber: String
	) {
		createCustomer(name: $name, personName: $personName, note: $identificationNumber) {
			name
			personName
			identificationNumber
		}
	}
`;
