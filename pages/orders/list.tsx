import React from "react";

import { ListOrders } from "@client/components/ListOrders/ListOrders";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function OrdersListPage({}: Props) {
  return <ListOrders />;
}

export const getServerSideProps = getStaticTranslations;
