import gql from 'graphql-tag';

export const CUSTOMER_FRAGMENT = gql`
	fragment CustomerFragment on Customer {
		id
		name
		identificationNumber
		personName
		email
		phone
	}
`;

export const GET_ALL_CUSTOMERS_QUERY = gql`
	query GetAllCustomers($first: Int, $skip: Int, $search: String) {
		getAllCustomers(first: $first, skip: $skip, search: $search) {
			totalCount
			items {
				...CustomerFragment
			}
		}
	}
	${CUSTOMER_FRAGMENT}
`;
