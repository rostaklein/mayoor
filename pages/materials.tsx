import React from "react";
import { MaterialEdit } from "../src/client/components/Material/MaterialEdit";
import { getStaticTranslations } from "../src/client/i18n";

type Props = {};

export default function Materials() {
  return <MaterialEdit />;
}

export const getServerSideProps = getStaticTranslations;
