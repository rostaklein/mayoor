import { arg, mutationField, idArg, intArg } from '@nexus/schema';
import { ProductionLogType } from '../../types';
import { ApolloError } from 'apollo-server-express';

export const AddProductionLog = mutationField('addProductionLog', {
  type: 'OrderItem',
  args: {
    orderItemId: idArg({ nullable: false }),
    action: arg({ type: ProductionLogType, nullable: false }),
    pieces: intArg({ nullable: false }),
  },
  resolve: async (_, { orderItemId, action, pieces }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    await ctx.prisma.productionLog.create({
      data: {
        action,
        pieces,
        orderItem: {
          connect: {
            id: orderItemId,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const updatedOrderItem = await ctx.prisma.orderItem.findOne({
      where: { id: orderItemId },
    });

    if (!updatedOrderItem) {
      throw new ApolloError('Order item not found', 'ORDER_ITEM_NOT_FOUND');
    }

    return updatedOrderItem;
  },
});
