import { useRouter } from "next/router";
import React from "react";
import { DetailCustomer } from "../../src/client/components/DetailCustomer/DetailCustomer";
import { DetailOrder } from "../../src/client/components/DetailOrder/DetailOrder";

export default function CustomerDetail() {
  const { query } = useRouter();
  return <DetailCustomer customerId={query.customerId} />;
}
