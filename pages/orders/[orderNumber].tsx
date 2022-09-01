import { useRouter } from "next/router";
import React from "react";

import { DetailOrder } from "@client/components/DetailOrder/DetailOrder";
import { getStaticTranslations } from "@client/i18n";

export default function OrderDetail() {
  const { query } = useRouter();

  if (typeof query.orderNumber !== "string") {
    return null;
  }
  return <DetailOrder orderNumber={Number(query.orderNumber)} />;
}

export const getServerSideProps = getStaticTranslations;
