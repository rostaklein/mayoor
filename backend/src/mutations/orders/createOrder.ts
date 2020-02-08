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

        const existingOrder = await ctx.prisma.order.findOne({
          where: { number },
        });

        if (existingOrder) {
          throw new Error(`Order number ${number} already exists`);
        }

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
