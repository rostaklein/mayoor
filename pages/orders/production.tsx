import React from "react";
import { useTranslation } from "next-i18next";
import { ListOrdersProduction } from "../../src/client/components/ListOrdersProduction/ListOrdersProduction";
import { getStaticTranslations } from "../../src/client/i18n";
import { OrderStatus } from "../../src/client/generated/gql-types";

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
