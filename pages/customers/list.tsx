import React from "react";
import { ListCustomers } from "../../src/client/components/ListCustomers/ListCustomers";
import { getStaticTranslations } from "../../src/client/i18n";

type Props = {};

export default function ListCustomersPage({}: Props) {
  return <ListCustomers />;
}

export const getServerSideProps = getStaticTranslations;
