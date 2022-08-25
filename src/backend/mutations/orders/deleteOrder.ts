import { mutationField, idArg, nonNull } from "nexus";

export const DeleteOrder = mutationField("deleteOrder", {
  type: "Order",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.order.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
