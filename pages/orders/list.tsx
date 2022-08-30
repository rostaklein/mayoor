import React from "react";
import { ListOrders } from "../../src/client/components/ListOrders/ListOrders";
import { getStaticTranslations } from "../../src/client/i18n";

type Props = {};

export default function OrdersListPage({}: Props) {
  return <ListOrders />;
}

export const getServerSideProps = getStaticTranslations;
