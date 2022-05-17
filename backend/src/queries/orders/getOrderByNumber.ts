import { queryField, intArg } from "nexus";

export const GetOrderByNumber = queryField("getOrderByNumber", {
  type: "Order",
  args: {
    number: intArg({ nullable: false }),
  },
  nullable: true,
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.order.findOne({ where: { number: args.number } });
  },
});
