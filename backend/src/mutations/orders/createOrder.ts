import { objectType, intArg } from 'nexus';

export const CreateOrder = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createOrder', {
      type: 'Order',
      args: {
        number: intArg({ nullable: false }),
      },
      resolve: async (_, { number }, ctx) => {
        const user = await ctx.user.getCurrentUser();
        return ctx.prisma.order.create({
          data: {
            number,
            createdBy: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      },
    });
  },
});
