import React from "react";
import { useTranslation } from "react-i18next";
import { ListOrdersProduction } from "../../src/client/components/ListOrdersProduction/ListOrdersProduction";
import { OrderStatus } from "../../src/client/__generated__/types";

type Props = {};

export default function OrdersToProducePage({}: Props) {
  const { t } = useTranslation();

  return (
    <ListOrdersProduction
      status={OrderStatus.WAITING_FOR_PRODUCTION}
      title={t("Waiting for production")}
      linkSuffix="production"
    />
  );
}
