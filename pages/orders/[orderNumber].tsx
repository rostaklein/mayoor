import { useRouter } from "next/router";
import React from "react";
import { DetailOrder } from "../../src/client/components/DetailOrder/DetailOrder";

export default function OrderDetail() {
  const { query } = useRouter();
  return <DetailOrder orderNumber={Number(query.orderId) ?? null} />;
}
