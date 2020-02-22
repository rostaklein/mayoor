import gql from 'graphql-tag';

export const GET_ALL_CUSTOMERS_QUERY = gql`
	query GetAllCustomers($first: Int, $last: Int, $after: String, $before: String) {
		getAllCustomers(first: $first, last: $last, after: $after, before: $before) {
			totalCount
			edges {
				node {
					id
					name
					identificationNumber
					personName
					email
					phone
				}
				cursor
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;
