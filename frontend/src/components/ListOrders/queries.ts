import gql from 'graphql-tag';

export const GET_ALL_ORDERS_QUERY = gql`
	query GetAllOrders($first: Int, $skip: Int, $status: OrderStatus) {
		getAllOrders(first: $first, skip: $skip, status: $status) {
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
				totalSize
				items {
					material {
						id
						name
					}
					pieces
				}
			}
		}
	}
`;
