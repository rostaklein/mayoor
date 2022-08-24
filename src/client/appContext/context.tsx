import React, { useReducer, useContext } from "react";

import { UserRole } from "../__generated__/types";

import { reducer, Action } from "./reducer";

export type User = {
  name: string | null;
  id: string;
  email: string;
  role: UserRole;
};

export type AppState = {
  currentUser: User | null;
};

type Context = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

const AppContext = React.createContext<Context | undefined>(undefined);

export const defaultState: AppState = {
  currentUser: null,
};

export const AppContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("App context not defined while accessing it");
  }

  return context;
};

export const useAppState = () => useAppContext().state;
export const useAppDispatch = () => useAppContext().dispatch;
