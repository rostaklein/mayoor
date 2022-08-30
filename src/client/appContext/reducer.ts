import { UserDataFragment } from "../components/Users/__generated__/queries.generated";
import { AppState } from "./context";

export type ActionTypes = "SET_CURRENT_USER";

type ActionBase = {
  type: ActionTypes;
};

interface SetCurrentUser extends ActionBase {
  type: "SET_CURRENT_USER";
  user: UserDataFragment | null;
}

export type Action = SetCurrentUser;

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      return {
        ...state,
        currentUser: action.user,
      };
    }
    default:
      return state;
  }
};
