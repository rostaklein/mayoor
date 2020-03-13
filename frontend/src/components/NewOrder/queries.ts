import gql from 'graphql-tag';

export const GET_HIGHEST_ORDER_NUMBER = gql`
	query GetHighestOrderNumber {
		getHighestOrderNumber
	}
`;

export const CREATE_ORDER = gql`
	mutation CreateOrder($input: OrderInput!) {
		createOrder(input: $input) {
			id
			customer {
				id
				name
			}
		}
	}
`;
