import { OrderFormValues } from "../OrderForm/OrderForm";
import { GetOrderQuery } from "./__generated__/queries.generated";

export const mapToOrderFormValues = (
  data?: GetOrderQuery
): OrderFormValues | undefined => {
  const order = data?.getOrderByNumber;

  if (!order) {
    return;
  }

  const { items, customer, ...rest } = order;
  return {
    customerId: customer?.id,
    items: items.map((item) => ({
      id: item.id,
      materialId: item.material?.id,
      name: item.name ?? undefined,
      width: item.width ?? undefined,
      height: item.height ?? undefined,
      pieces: item.pieces ?? undefined,
      totalPrice: item.totalPrice ?? undefined,
      totalTax: item.totalTax ?? undefined,
    })),
    ...rest,
    note: rest.note ?? undefined,
  };
};
