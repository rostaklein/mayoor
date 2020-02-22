import gql from 'graphql-tag';

export const CREATE_CUSTOMER_MUTATION = gql`
	mutation CreateCustomerMutation($input: CreateCustomerInput!) {
		createCustomer(input: $input) {
			name
			personName
			identificationNumber
		}
	}
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
