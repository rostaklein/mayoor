import { queryField, idArg, nonNull } from "nexus";

export const GetCustomer = queryField("getCustomer", {
  type: "Customer",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.customer.findUnique({ where: { id: args.id } });
  },
});
