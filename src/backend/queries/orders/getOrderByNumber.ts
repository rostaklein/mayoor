import { queryField, intArg, nonNull } from "nexus";

export const GetOrderByNumber = queryField("getOrderByNumber", {
  type: "Order",
  args: {
    number: nonNull(intArg()),
  },
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.order.findUnique({ where: { number: args.number } });
  },
});
