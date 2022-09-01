import { useRouter } from "next/router";
import React from "react";

import { DetailCustomer } from "@client/components/DetailCustomer/DetailCustomer";
import { getStaticTranslations } from "@client/i18n";

export default function CustomerDetail() {
  const { query } = useRouter();

  if (query.customerId !== "string") {
    return null;
  }

  return <DetailCustomer customerId={query.customerId} />;
}

export const getServerSideProps = getStaticTranslations;
