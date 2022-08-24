import React, { Suspense, useEffect } from "react";
import { useQuery, ApolloProvider } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Alert, message } from "antd";

import "antd/dist/antd.css";
import "../src/client/index.css";

import { client } from "../src/client/ApolloClient";
import {
  useAppDispatch,
  useAppState,
  AppContextProvider,
} from "../src/client/appContext/context";
import { LoginForm } from "../src/client/components/Login/LoginForm";
import { ME_QUERY } from "../src/client/components/Login/queries";
import { MainWrapper } from "../src/client/components/MainWrapper/MainWrapper";
import { CenteredSpinner } from "../src/client/components/SharedStyles/CenteredSpinner";
import { MeQuery } from "../src/client/__generated__/types";
import { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppState();
  const { t, i18n } = useTranslation();

  const language =
    typeof window !== "undefined"
      ? localStorage.getItem("default-language")
      : "en";
  useEffect(() => {
    // i18n.changeLanguage(language || "en");
  }, [language]);

  const { called, loading, error } = useQuery<MeQuery>(ME_QUERY, {
    onError: (err) => {
      const token = localStorage.getItem("auth-token");
      if (
        token &&
        err.graphQLErrors.length &&
        err.graphQLErrors[0].extensions?.code === "NOT_AUTHORIZED"
      ) {
        localStorage.removeItem("auth-token");
        message.error(t("inactivity_logged_out"));
      }
    },
    onCompleted: (data) => {
      if (data) {
        const { id, name, email, role } = data.me;
        dispatch({
          type: "SET_CURRENT_USER",
          user: {
            id,
            name,
            email,
            role,
          },
        });
      }
    },
  });

  if (loading || !called) {
    return <CenteredSpinner />;
  }

  if (currentUser) {
    return (
      <MainWrapper>
        <Component />
      </MainWrapper>
    );
  }

  const hasBackendError =
    error?.networkError ||
    error?.graphQLErrors.length === 0 ||
    error?.graphQLErrors[0].extensions?.code === "INTERNAL_SERVER_ERROR";

  return (
    <Suspense fallback={<CenteredSpinner />}>
      {hasBackendError && (
        <Alert
          message={t("Could not connect to the backend server")}
          type="error"
          showIcon
          banner
          closable
        />
      )}
      <LoginForm />
    </Suspense>
  );
};

const AppWithProviders: React.FC<AppProps> = (props) => (
  <ApolloProvider client={client}>
    <AppContextProvider>
      <App {...props} />
    </AppContextProvider>
  </ApolloProvider>
);

export default AppWithProviders;
