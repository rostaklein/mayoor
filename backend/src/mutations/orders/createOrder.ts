import { objectType, intArg, floatArg, stringArg, idArg, arg } from 'nexus';
import { UserInputError } from 'apollo-server-express';
import { OrderItemInput } from './addOrderItem';

export const CreateOrder = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createOrder', {
      type: 'Order',
      args: {
        number: intArg({ nullable: false }),
        totalPrice: floatArg(),
        totalTax: floatArg(),
        note: stringArg(),
        customerId: idArg(),
        items: arg({ type: OrderItemInput, list: true }),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.user.getCurrentUser();

        const existingOrder = await ctx.prisma.order.findOne({
          where: { number: args.number },
        });

        if (existingOrder) {
          throw new UserInputError(
            `Order number ${args.number} already exists`,
          );
        }

        return ctx.prisma.order.create({
          data: {
            number: args.number,
            totalPrice: args.totalPrice || 0,
            totalTax: args.totalTax || 0,
            note: args.note,
            customer: args.customerId
              ? {
                  connect: {
                    id: args.customerId,
                  },
                }
              : undefined,
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
