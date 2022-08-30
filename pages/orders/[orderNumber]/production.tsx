import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { DetailOrderProduction } from "../../../src/client/components/DetailOrderProduction/DetailOrderProduction";
import { getStaticTranslations } from "../../../src/client/i18n";
import { ProductionLogAction } from "../../../src/client/generated/gql-types";

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
