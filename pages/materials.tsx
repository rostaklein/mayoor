import React from "react";

import { MaterialEdit } from "@client/components/Material/MaterialEdit";
import { getStaticTranslations } from "@client/i18n";

type Props = {};

export default function Materials() {
  return <MaterialEdit />;
}

export const getServerSideProps = getStaticTranslations;
