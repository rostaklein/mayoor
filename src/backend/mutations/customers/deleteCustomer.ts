import { mutationField, idArg, nonNull } from "nexus";

export const DeleteCustomer = mutationField("deleteCustomer", {
  type: "Customer",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.customer.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
