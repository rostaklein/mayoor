import { idArg, mutationField, arg, nonNull } from "nexus";
import { OrderStatus } from "../../types";

export const UpdateOrderStatus = mutationField("updateOrderStatus", {
  type: "Order",
  args: {
    id: nonNull(idArg()),
    status: nonNull(arg({ type: OrderStatus })),
  },
  resolve: async (_, { id, status }, ctx) => {
    return ctx.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  },
});
