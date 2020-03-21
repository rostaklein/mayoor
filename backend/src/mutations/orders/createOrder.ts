import { objectType, arg, inputObjectType, intArg } from 'nexus';
import { ApolloError } from 'apollo-server-express';
import { OrderItemInput } from './addOrderItem';
import { mapOrderItemInputToCreateOrderItem } from '../../mappers/mapOrderItem';
import { OrderStatus } from '../../types';

export const OrderInput = inputObjectType({
  name: 'OrderInput',
  definition(t) {
    t.float('totalPrice', { nullable: false });
    t.float('totalTax', { nullable: false });
    t.string('note');
    t.id('customerId');
    t.field('items', { type: OrderItemInput, list: true, nullable: false });
    t.field('status', { type: OrderStatus });
    t.int('urgency');
  },
});

export const CreateOrder = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createOrder', {
      type: 'Order',
      args: {
        number: intArg({ nullable: false }),
        input: arg({ type: OrderInput, nullable: false }),
      },
      resolve: async (_, { number, input }, ctx) => {
        const user = await ctx.user.getCurrentUser();

        const existingOrder = await ctx.prisma.order.findOne({
          where: { number },
        });

        if (existingOrder) {
          throw new ApolloError(
            `Order number ${number} already exists`,
            'ORDER_NUMBER_EXISTS',
          );
        }

        if (input.items.length === 0) {
          throw new ApolloError(
            `Order needs to have at least one item`,
            'INVALID_ITEMS_LENGTH',
          );
        }

        return ctx.prisma.order.create({
          data: {
            number,
            totalPrice: input.totalPrice || 0,
            totalTax: input.totalTax || 0,
            note: input.note,
            status: input.status || 'NEW',
            urgency: input.urgency,
            customer: input.customerId
              ? {
                  connect: {
                    id: input.customerId,
                  },
                }
              : undefined,
            items: {
              create: mapOrderItemInputToCreateOrderItem(input.items, user.id),
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
  },
});
