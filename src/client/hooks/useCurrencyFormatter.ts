import { useTranslation } from "next-i18next";

import { CURRENCY } from "../config";

export const useCurrencyFormatter = () => {
  const { i18n } = useTranslation();

  const currencyFormatter = (value: number): string => {
    return value.toLocaleString(i18n.language, {
      style: "currency",
      currency: CURRENCY,
      useGrouping: true,
    });
  };

  return { currencyFormatter };
};
