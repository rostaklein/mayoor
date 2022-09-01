import React from "react";
import { useTranslation } from "next-i18next";

import { ListOrdersProduction } from "@client/components/ListOrdersProduction/ListOrdersProduction";
import { getStaticTranslations } from "@client/i18n";
import { OrderStatus } from "@client/generated/gql-types";

type Props = {};

export default function OrdersToPrintPage({}: Props) {
  const { t } = useTranslation();

  return (
    <ListOrdersProduction
      status={OrderStatus.ReadyToPrint}
      title={t("To be printed")}
      linkSuffix="print"
    />
  );
}

export const getServerSideProps = getStaticTranslations;
