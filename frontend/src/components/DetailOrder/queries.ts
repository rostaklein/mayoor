import gql from 'graphql-tag';

export const ORDER_FRAGMENT = gql`
	fragment OrderFragment on Order {
		id
		number
		customer {
			id
			name
			identificationNumber
		}
		status
		note
		urgency
		totalPrice
		totalTax
		createdAt
		updatedAt
		createdBy {
			id
			name
		}
		items(orderBy: { createdAt: asc }) {
			id
			material {
				id
			}
			name
			width
			height
			pieces
			totalPrice
			totalTax
		}
	}
`;

export const GET_ORDER = gql`
	query GetOrder($number: Int!) {
		getOrderByNumber(number: $number) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER = gql`
	mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
		updateOrder(id: $id, input: $input) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`;

export const DELETE_ORDER = gql`
	mutation DeleteOrder($id: ID!) {
		deleteOrder(id: $id) {
			id
		}
	}
`;
