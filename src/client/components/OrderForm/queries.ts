import gql from 'graphql-tag';

import { CUSTOMER_FRAGMENT } from '../ListCustomers/queries';

export const FIND_CUSTOMER_QUERY = gql`
	query FindCustomerQuery($search: String) {
		getAllCustomers(first: 5, search: $search) {
			totalCount
			items {
				...CustomerFragment
			}
		}
	}
	${CUSTOMER_FRAGMENT}
`;
