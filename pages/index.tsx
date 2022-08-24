import { GetServerSideProps, NextPage } from "next";
import React from "react";

type Props = {};

export const Index: NextPage = () => {
  return <h1>Hi</h1>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: "/orders/list",
    },
  };
};

export default Index;
