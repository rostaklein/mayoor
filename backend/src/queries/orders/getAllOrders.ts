import { objectType } from 'nexus';

export const GetAllOrders = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('getAllOrders', {
      type: 'Order',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.order.findMany();
      },
    });
  },
});
