import { mutationField, idArg } from 'nexus';

export const DeleteOrder = mutationField('deleteOrder', {
  type: 'Order',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.order.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
