import gql from 'graphql-tag';

export const GET_ALL_ORDERS_QUERY = gql`
	query GetAllOrders($first: Int, $skip: Int) {
		getAllOrders(first: $first, skip: $skip) {
			totalCount
			items {
				id
				number
				customer {
					id
					name
				}
				createdAt
				totalPrice
				totalTax
				items {
					material {
						name
					}
					pieces
				}
			}
		}
	}
`;
