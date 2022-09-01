import React, { Suspense, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useTranslation, appWithTranslation } from "next-i18next";
import { Alert, message } from "antd";
import { AppProps } from "next/app";

import "antd/dist/antd.css";
import "@client/index.css";

import nextI18nConfig from "../next-i18next.config";

import { client } from "@client/ApolloClient";
import {
  useAppDispatch,
  useAppState,
  AppContextProvider,
} from "@client/appContext/context";
import { LoginForm } from "@client/components/Login/LoginForm";
import { MainWrapper } from "@client/components/MainWrapper/MainWrapper";
import { CenteredSpinner } from "@client/components/SharedStyles/CenteredSpinner";
import { useMeQuery } from "@client/components/Login/__generated__/queries.generated";

const App: React.FC<AppProps> = ({ Component }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppState();
  const { t } = useTranslation();

  const language =
    typeof window !== "undefined"
      ? localStorage.getItem("default-language")
      : "en";
  useEffect(() => {
    // i18n.changeLanguage(language || "en");
  }, [language]);

  const { called, loading, error } = useMeQuery({
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
        dispatch({
          type: "SET_CURRENT_USER",
          user: data.me ?? null,
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

export default appWithTranslation(AppWithProviders, nextI18nConfig);
