import { arg } from 'nexus';
import { mutationField, inputObjectType, idArg } from 'nexus/dist/core';

export const OrderItemInput = inputObjectType({
  name: 'OrderItemInput',
  definition(t) {
    t.string('name');
    t.float('totalPrice', { nullable: false });
    t.float('totalTax', { nullable: false });
    t.float('width');
    t.float('height');
    t.int('pieces');
    t.id('materialId');
  },
});

export const AddOrderItem = mutationField('addOrderItem', {
  type: 'OrderItem',
  args: {
    orderId: idArg(),
    input: arg({ type: OrderItemInput, nullable: false }),
  },
  resolve: async (_, { orderId, input }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const { materialId, ...rest } = input;

    return ctx.prisma.orderItem.create({
      data: {
        ...rest,
        material: materialId
          ? {
              connect: {
                id: materialId,
              },
            }
          : undefined,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        order: {
          connect: {
            id: orderId,
          },
        },
      },
    });
  },
});
