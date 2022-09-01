import React from "react";

import { NewCustomer } from "@client/components/NewCustomer/NewCustomer";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function NewCustomerPage({}: Props) {
  return <NewCustomer />;
}

export const getServerSideProps = getStaticTranslations;
