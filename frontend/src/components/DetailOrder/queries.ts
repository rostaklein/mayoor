import gql from 'graphql-tag';

export const GET_ORDER = gql`
	query GetOrder($id: ID!) {
		getOrder(id: $id) {
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
			items {
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
	}
`;
