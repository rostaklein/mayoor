import { queryField, objectType } from 'nexus';
import { findManyCursor } from '../../utils/findManyCursor';
import { getEdgeObjectType, connectionArgs } from '../../utils/connection';

export const OrdersConnection = objectType({
  name: 'OrdersConnection',
  definition(t) {
    t.int('totalCount');
    t.field('pageInfo', {
      type: 'PageInfo',
    });
    t.list.field('edges', {
      type: 'OrderEdge',
    });
  },
});

export const OrderEdge = getEdgeObjectType('Order');

export const GetAllOrders = queryField('getAllOrders', {
  type: 'OrdersConnection',
  args: connectionArgs,
  nullable: false,
  resolve: async (_parent, args, ctx) => {
    const orders = await findManyCursor(
      _args => ctx.prisma.order.findMany(_args),
      args,
    );
    return {
      totalCount: await ctx.prisma.order.count(),
      ...orders,
    };
  },
});
