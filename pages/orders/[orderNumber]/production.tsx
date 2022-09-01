import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

import { DetailOrderProduction } from "@client/components/DetailOrderProduction/DetailOrderProduction";
import { getStaticTranslations } from "@client/i18n";
import { ProductionLogAction } from "@client/generated/gql-types";

export default function OrderDetail() {
  const { query } = useRouter();
  const { t } = useTranslation();

  return (
    <DetailOrderProduction
      productionLogType={ProductionLogAction.Production}
      productionButtonText={t("Finished")}
      orderNumber={Number(query.orderNumber) ?? null}
    />
  );
}

export const getServerSideProps = getStaticTranslations;
