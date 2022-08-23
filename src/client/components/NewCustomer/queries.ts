import gql from 'graphql-tag';

import { CUSTOMER_FRAGMENT } from '../ListCustomers/queries';

export const CREATE_CUSTOMER_MUTATION = gql`
	mutation CreateCustomerMutation($input: CreateCustomerInput!) {
		createCustomer(input: $input) {
			...CustomerFragment
		}
	}
	${CUSTOMER_FRAGMENT}
`;

export const GET_CUSTOMER_HELPER_INFO = gql`
	query GetCustomerHelperInfo($partialIdentificationNumber: String!) {
		getCustomerHelperInfo(partialIdentificationNumber: $partialIdentificationNumber) {
			identificationNumber
			taxIdentificationNumber
			name
			city
			street
			postNumber
		}
	}
`;
