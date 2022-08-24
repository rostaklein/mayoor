import gql from 'graphql-tag';

export const GET_HIGHEST_ORDER_NUMBER = gql`
	query GetHighestOrderNumber {
		getHighestOrderNumber
	}
`;

export const CREATE_ORDER = gql`
	mutation CreateOrder($number: Int!, $input: OrderInput!) {
		createOrder(number: $number, input: $input) {
			id
			number
		}
	}
`;
