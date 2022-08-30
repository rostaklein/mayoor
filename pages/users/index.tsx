import React from "react";
import { UserEdit } from "../../src/client/components/Users/UserEdit";
import { getStaticTranslations } from "../../src/client/i18n";

type Props = {};

export default function Users() {
  return <UserEdit />;
}

export const getServerSideProps = getStaticTranslations;
