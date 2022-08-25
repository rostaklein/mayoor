import { queryField, idArg, nonNull } from "nexus";

export const GetOrder = queryField("getOrder", {
  type: "Order",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.order.findUnique({ where: { id: args.id } });
  },
});
