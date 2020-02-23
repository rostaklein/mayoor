import gql from 'graphql-tag';
const CUSTOMER_FRAGMENT = gql`
	fragment CustomerDetails on Customer {
		id
		name
		identificationNumber
		taxIdentificationNumber
		personName
		email
		phone
		note
		allowedBankPayments
		createdBy {
			name
		}
		createdAt
		updatedAt
		addresses {
			id
			isPrimary
			street
			city
			postNumber
		}
	}
`;

export const GET_CUSTOMER = gql`
	query GetCustomer($id: ID!) {
		getCustomer(id: $id) {
			...CustomerDetails
		}
	}
	${CUSTOMER_FRAGMENT}
`;

export const UPDATE_CUSTOMER = gql`
	mutation UpdateCustomer($input: UpdateCustomerInput!) {
		updateCustomer(input: $input) {
			...CustomerDetails
		}
	}
	${CUSTOMER_FRAGMENT}
`;
