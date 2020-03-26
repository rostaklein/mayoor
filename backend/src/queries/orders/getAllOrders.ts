import { queryField, arg } from 'nexus';
import { paginationArgs, getPaginatedObjectType } from '../../utils/pagination';
import { OrderStatus } from '../../types';

export const GetAllOrders = queryField('getAllOrders', {
  type: getPaginatedObjectType('Order'),
  args: {
    ...paginationArgs,
    status: arg({ type: OrderStatus }),
    orderByUrgency: 'OrderByArg',
  },
  nullable: false,
  resolve: async (_parent, { status, orderByUrgency, ...args }, ctx) => {
    const orders = await ctx.prisma.order.findMany({
      ...args,
      where: {
        status,
      },
      orderBy: orderByUrgency
        ? { urgency: orderByUrgency }
        : { createdAt: 'desc' },
    });
    const allMatchingOrders = await ctx.prisma.order.findMany({
      where: {
        status,
      },
    });
    return {
      totalCount: allMatchingOrders.length,
      items: orders,
    };
  },
});
