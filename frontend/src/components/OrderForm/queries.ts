import gql from 'graphql-tag';

export const FIND_CUSTOMER_QUERY = gql`
	query FindCustomerQuery($search: String) {
		getAllCustomers(first: 10, search: $search) {
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
