import { queryField } from 'nexus';
import { paginationArgs, getPaginatedObjectType } from '../../utils/pagination';

export const GetAllOrders = queryField('getAllOrders', {
  type: getPaginatedObjectType('Order'),
  args: paginationArgs,
  nullable: false,
  resolve: async (_parent, args, ctx) => {
    const orders = await ctx.prisma.order.findMany({
      ...args,
      orderBy: { createdAt: 'desc' },
    });
    return {
      totalCount: await ctx.prisma.order.count(),
      items: orders,
    };
  },
});
