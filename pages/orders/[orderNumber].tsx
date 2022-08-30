import { useRouter } from "next/router";
import React from "react";
import { DetailOrder } from "../../src/client/components/DetailOrder/DetailOrder";
import { getStaticTranslations } from "../../src/client/i18n";

export default function OrderDetail() {
  const { query } = useRouter();
  return <DetailOrder orderNumber={Number(query.orderNumber) ?? null} />;
}

export const getServerSideProps = getStaticTranslations;
