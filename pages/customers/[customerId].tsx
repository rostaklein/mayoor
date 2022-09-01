import { useRouter } from "next/router";
import React from "react";

import { DetailCustomer } from "@client/components/DetailCustomer/DetailCustomer";
import { DetailOrder } from "@client/components/DetailOrder/DetailOrder";
import { getStaticTranslations } from "@client/i18n";

export default function CustomerDetail() {
  const { query } = useRouter();
  return <DetailCustomer customerId={query.customerId} />;
}

export const getServerSideProps = getStaticTranslations;
