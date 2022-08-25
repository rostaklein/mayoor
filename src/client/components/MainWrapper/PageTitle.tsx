import styled from "styled-components";
import { Colors } from "../../themeVariables";

export const PageTitleH1 = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.DARK_GRAY3};
  margin: 0;
  padding: 16px 28px;
`;

import React from "react";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  doNotUseAsTitle?: boolean;
};

export const PageTitle: React.FC<Props> = ({ children, doNotUseAsTitle }) => {
  return (
    <>
      <Head>
        {typeof children === "string" && !doNotUseAsTitle && (
          <title>{children} | mayoor</title>
        )}
      </Head>
      <PageTitleH1>{children}</PageTitleH1>
    </>
  );
};
