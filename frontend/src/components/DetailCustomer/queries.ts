import gql from 'graphql-tag';

export const GET_CUSTOMER = gql`
	query GetCustomer($id: ID!) {
		getCustomer(id: $id) {
			name
			identificationNumber
			taxIdentificationNumber
			personName
			email
			phone
			note
			allowedBankPayments
			address {
				isPrimary
				street
				city
				postNumber
			}
		}
	}
`;
