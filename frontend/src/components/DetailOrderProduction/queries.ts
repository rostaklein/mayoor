import gql from 'graphql-tag';

import { ORDER_FRAGMENT } from '../DetailOrder/queries';

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
			printedPieces
			producedPieces
			productionLog {
				...ProductionLogFragment
			}
		}
	}
	${PRODUCTION_LOG_FRAGMENT}
`;

export const UPDATE_ORDER_NOTE = gql`
	mutation UpdateOrderNote($id: ID!, $note: String) {
		updateOrderNote(id: $id, note: $note) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER_STATUS = gql`
	mutation UpdateOrderStatus($id: ID!, $status: OrderStatus!) {
		updateOrderStatus(id: $id, status: $status) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`;
