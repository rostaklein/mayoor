import { arg, inputObjectType, idArg, mutationField } from 'nexus';
import { ApolloError } from 'apollo-server-express';
import { OrderStatus } from '../../types';
import { mapOrderItemInputToCreateOrderItem } from '../../mappers/mapOrderItem';

export const UpdateOrderItemInput = inputObjectType({
  name: 'UpdateOrderItemInput',
  definition(t) {
    t.id('id');
    t.string('name');
    t.float('totalPrice', { nullable: false });
    t.float('totalTax', { nullable: false });
    t.float('width');
    t.float('height');
    t.int('pieces');
    t.id('materialId');
  },
});

export const UpdateOrderInput = inputObjectType({
  name: 'UpdateOrderInput',
  definition(t) {
    t.float('totalPrice');
    t.float('totalTax');
    t.string('note');
    t.id('customerId');
    t.field('items', {
      type: UpdateOrderItemInput,
      list: true,
    });
    t.field('status', { type: OrderStatus });
    t.int('urgency');
  },
});

export const UpdateOrder = mutationField('updateOrder', {
  type: 'Order',
  args: {
    id: idArg(),
    input: arg({ type: UpdateOrderInput, nullable: false }),
  },
  resolve: async (_, { id, input }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const order = await ctx.prisma.order.findOne({ where: { id } });

    if (!order) {
      throw new ApolloError(`Order not found`, 'NOT_FOUND');
    }

    const orderItems = await ctx.prisma.orderItem.findMany({
      where: { order: { id } },
    });

    const inputItemIds = input.items?.map(({ id }) => id) ?? [];
    const itemsToDelete = orderItems.filter(
      ({ id }) => !inputItemIds.includes(id),
    );
    const itemsToUpdate = orderItems.filter(({ id }) =>
      inputItemIds.includes(id),
    );

    itemsToUpdate.forEach(async itemToUpdate => {
      const updateData = input.items?.find(
        inputItem => inputItem.id === itemToUpdate.id,
      );

      if (updateData) {
        const { materialId, ...rest } = updateData;
        await ctx.prisma.orderItem.update({
          where: { id: itemToUpdate.id },
          data: { ...rest, material: { connect: { id: materialId } } },
        });
      }
    });

    const itemsToCreate = input.items?.filter(({ id }) => !id);

    return ctx.prisma.order.update({
      where: {
        id,
      },
      data: {
        totalPrice: input.totalPrice || undefined,
        totalTax: input.totalTax || undefined,
        note: input.note,
        status: input.status || undefined,
        urgency: input.urgency,
        customer: input.customerId
          ? {
              connect: {
                id: input.customerId,
              },
            }
          : undefined,
        items: {
          deleteMany: {
            OR: itemsToDelete.map(({ id }) => ({ id })),
          },
          create: mapOrderItemInputToCreateOrderItem(itemsToCreate, user.id),
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  },
});
