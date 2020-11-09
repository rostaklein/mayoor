import { queryField } from '@nexus/schema';

export const GetHighestOrderNumber = queryField('getHighestOrderNumber', {
  type: 'Int',
  nullable: true,
  resolve: async (_parent, _args, ctx) => {
    const orders = await ctx.prisma.order.findMany({
      orderBy: { number: 'desc' },
      take: 1,
    });
    if (orders.length === 0) {
      return 1;
    }
    return orders[0].number;
  },
});
