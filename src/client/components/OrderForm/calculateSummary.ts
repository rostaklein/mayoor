import { OrderFormValues } from "./OrderForm";

export const getTotalPriceIncludingTax = (values: OrderFormValues) => {
  if (values.totalPrice === undefined || values.totalTax === undefined) {
    return;
  }
  return values.totalPrice + values.totalTax;
};

type Summary = {
  totalPrice: number;
  totalTax: number;
};

export const calculateSummary = (formValues: OrderFormValues): Summary => {
  return formValues.items.reduce<Summary>(
    (acc, item) => {
      if (!item.totalPrice || !item.totalTax) {
        return acc;
      }
      acc.totalPrice += item.totalPrice;
      acc.totalTax += item.totalTax;
      return acc;
    },
    { totalPrice: 0, totalTax: 0 }
  );
};
