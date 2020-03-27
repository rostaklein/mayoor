import gql from 'graphql-tag';

export const PRODUCTION_LOG_FRAGMENT = gql`
	fragment ProductionLogFragment on ProductionLog {
		id
		action
		pieces
		createdAt
		createdBy {
			id
			name
		}
	}
`;

export const ADD_PRODUCTION_LOG_MUTATION = gql`
	mutation AddProductionLog($orderItemId: ID!, $action: ProductionLogType!, $pieces: Int!) {
		addProductionLog(orderItemId: $orderItemId, action: $action, pieces: $pieces) {
			id
			productionLog {
				...ProductionLogFragment
			}
		}
	}
	${PRODUCTION_LOG_FRAGMENT}
`;
