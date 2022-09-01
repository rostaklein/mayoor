import React from "react";

import { NewOrder } from "@client/components/NewOrder/NewOrder";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function NewOrderPage({}: Props) {
  return <NewOrder />;
}

export const getServerSideProps = getStaticTranslations;
