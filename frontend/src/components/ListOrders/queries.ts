import gql from 'graphql-tag';

export const GET_ALL_ORDERS_QUERY = gql`
	query GetAllOrders($first: Int, $skip: Int, $status: OrderStatus, $orderByUrgency: OrderByArg) {
		getAllOrders(first: $first, skip: $skip, status: $status, orderByUrgency: $orderByUrgency) {
			totalCount
			items {
				id
				number
				status
				urgency
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
