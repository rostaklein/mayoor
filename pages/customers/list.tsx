import React from "react";

import { ListCustomers } from "@client/components/ListCustomers/ListCustomers";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function ListCustomersPage({}: Props) {
  return <ListCustomers />;
}

export const getServerSideProps = getStaticTranslations;
