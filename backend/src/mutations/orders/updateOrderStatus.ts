import { idArg, mutationField, arg } from 'nexus';
import { OrderStatus } from '../../types';

export const UpdateOrderStatus = mutationField('updateOrderStatus', {
  type: 'Order',
  args: {
    id: idArg(),
    status: arg({ type: OrderStatus, nullable: false }),
  },
  resolve: async (_, { id, status }, ctx) => {
    return ctx.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  },
});
