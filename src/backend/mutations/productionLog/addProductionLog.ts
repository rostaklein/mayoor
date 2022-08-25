import { arg, mutationField, idArg, intArg, nonNull } from "nexus";
import { ApolloError } from "apollo-server-micro";
import { ProductionLogActionEnum } from "../../types";

export const AddProductionLog = mutationField("addProductionLog", {
  type: "OrderItem",
  args: {
    orderItemId: nonNull(idArg()),
    action: nonNull(arg({ type: ProductionLogActionEnum })),
    pieces: nonNull(intArg()),
  },
  resolve: async (_, { orderItemId, action, pieces }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    await ctx.prisma.productionLog.create({
      data: {
        action,
        pieces,
        orderItem: {
          connect: {
            id: orderItemId,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const updatedOrderItem = await ctx.prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });

    if (!updatedOrderItem) {
      throw new ApolloError("Order item not found", "ORDER_ITEM_NOT_FOUND");
    }

    return updatedOrderItem;
  },
});
