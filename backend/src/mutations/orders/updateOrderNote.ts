import { idArg, mutationField, stringArg } from 'nexus';

export const UpdateOrderNote = mutationField('updateOrderNote', {
  type: 'Order',
  args: {
    id: idArg(),
    note: stringArg(),
  },
  resolve: async (_, { id, note }, ctx) => {
    return ctx.prisma.order.update({
      where: {
        id,
      },
      data: {
        note,
      },
    });
  },
});
