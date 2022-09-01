import React from "react";
import { useTranslation } from "next-i18next";

import { ListOrdersProduction } from "@client/components/ListOrdersProduction/ListOrdersProduction";
import { getStaticTranslations } from "@client/i18n";
import { OrderStatus } from "@client/generated/gql-types";

type Props = {};

export default function OrdersToProducePage({}: Props) {
  const { t } = useTranslation();

  return (
    <ListOrdersProduction
      status={OrderStatus.WaitingForProduction}
      title={t("Waiting for production")}
      linkSuffix="production"
    />
  );
}

export const getServerSideProps = getStaticTranslations;
