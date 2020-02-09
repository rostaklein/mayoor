import { AppState, User } from './context';

export type ActionTypes = 'SET_CURRENT_USER';

type ActionBase = {
	type: ActionTypes;
};

interface SetCurrentUser extends ActionBase {
	type: 'SET_CURRENT_USER';
	user: User | null;
}

export type Action = SetCurrentUser;

export const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'SET_CURRENT_USER': {
			return {
				...state,
				currentUser: action.user,
			};
		}
		default:
			return state;
	}
};
