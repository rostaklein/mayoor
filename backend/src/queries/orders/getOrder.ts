import { queryField, idArg } from 'nexus';

export const GetOrder = queryField('getOrder', {
  type: 'Order',
  args: {
    id: idArg({ nullable: false }),
  },
  nullable: true,
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.order.findOne({ where: { id: args.id } });
  },
});
