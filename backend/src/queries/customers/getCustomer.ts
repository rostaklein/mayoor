import { queryField, idArg } from 'nexus';

export const GetCustomer = queryField('getCustomer', {
  type: 'Customer',
  args: {
    id: idArg({ nullable: false }),
  },
  nullable: true,
  resolve: async (_parent, args, ctx) => {
    return ctx.prisma.customer.findOne({ where: { id: args.id } });
  },
});
