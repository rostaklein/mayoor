import gql from 'graphql-tag';

export const GET_ALL_CUSTOMERS_QUERY = gql`
	query GetAllCustomers($first: Int, $skip: Int, $search: String) {
		getAllCustomers(first: $first, skip: $skip, search: $search) {
			totalCount
			items {
				id
				name
				identificationNumber
				personName
				email
				phone
			}
		}
	}
`;
