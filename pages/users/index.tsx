import React from "react";

import { UserEdit } from "@client/components/Users/UserEdit";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function Users() {
  return <UserEdit />;
}

export const getServerSideProps = getStaticTranslations;
