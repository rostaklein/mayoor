import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { DetailOrderProduction } from "../../../src/client/components/DetailOrderProduction/DetailOrderProduction";
import { ProductionLogType } from "../../../src/client/__generated__/types";

export default function OrderDetail() {
  const { query } = useRouter();
  const { t } = useTranslation();

  return (
    <DetailOrderProduction
      productionLogType={ProductionLogType.PRINT}
      productionButtonText={t("Printed")}
      orderNumber={Number(query.orderNumber) ?? null}
    />
  );
}
