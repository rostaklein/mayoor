import { useRouter } from "next/router";
import React from "react";
import { DetailCustomer } from "../../src/client/components/DetailCustomer/DetailCustomer";
import { DetailOrder } from "../../src/client/components/DetailOrder/DetailOrder";
import { getStaticTranslations } from "../../src/client/i18n";

export default function CustomerDetail() {
  const { query } = useRouter();
  return <DetailCustomer customerId={query.customerId} />;
}

export const getServerSideProps = getStaticTranslations;
