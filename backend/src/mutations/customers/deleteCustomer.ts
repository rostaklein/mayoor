import { mutationField, idArg } from 'nexus';

export const DeleteCustomer = mutationField('deleteCustomer', {
  type: 'Customer',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.customer.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
