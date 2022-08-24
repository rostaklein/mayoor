import React from "react";
import { useTranslation } from "react-i18next";
import { ListOrdersProduction } from "../../src/client/components/ListOrdersProduction/ListOrdersProduction";
import { OrderStatus } from "../../src/client/__generated__/types";

type Props = {};

export default function OrdersToPrintPage({}: Props) {
  const { t } = useTranslation();

  return (
    <ListOrdersProduction
      status={OrderStatus.READY_TO_PRINT}
      title={t("To be printed")}
      linkSuffix="print"
    />
  );
}
