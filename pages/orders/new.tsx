import React from "react";
import { NewOrder } from "../../src/client/components/NewOrder/NewOrder";
import { getStaticTranslations } from "../../src/client/i18n";

type Props = {};

export default function NewOrderPage({}: Props) {
  return <NewOrder />;
}

export const getServerSideProps = getStaticTranslations;
