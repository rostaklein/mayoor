import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { DetailOrderProduction } from "../../../src/client/components/DetailOrderProduction/DetailOrderProduction";
import { ProductionLogType } from "../../../src/client/__generated__/types";
import { getStaticTranslations } from "../../../src/client/i18n";

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

export const getServerSideProps = getStaticTranslations;
