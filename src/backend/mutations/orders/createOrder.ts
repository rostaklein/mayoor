import { objectType, arg, inputObjectType, intArg, nonNull } from "nexus";
import { ApolloError } from "apollo-server-micro";

import { mapOrderItemInputToCreateOrderItem } from "../../mappers/mapOrderItem";

import { OrderStatus } from "@backend/types";

export const OrderItemInput = inputObjectType({
  name: "OrderItemInput",
  definition(t) {
    t.string("name");
    t.nonNull.float("totalPrice");
    t.nonNull.float("totalTax");
    t.float("width");
    t.float("height");
    t.int("pieces");
    t.id("materialId");
  },
});

export const OrderInput = inputObjectType({
  name: "OrderInput",
  definition(t) {
    t.nonNull.float("totalPrice");
    t.nonNull.float("totalTax");
    t.string("note");
    t.nonNull.id("customerId");
    t.nonNull.list.field("items", { type: nonNull(OrderItemInput) });
    t.field("status", { type: OrderStatus });
    t.int("urgency");
  },
});

export const CreateOrder = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createOrder", {
      type: "Order",
      args: {
        number: nonNull(intArg()),
        input: nonNull(arg({ type: nonNull(OrderInput) })),
      },
      resolve: async (_, { number, input }, ctx) => {
        const user = await ctx.user.getCurrentUser();

        const existingOrder = await ctx.prisma.order.findUnique({
          where: { number },
        });

        if (existingOrder) {
          throw new ApolloError(
            `Order number ${number} already exists`,
            "ORDER_NUMBER_EXISTS"
          );
        }

        if (input.items.length === 0) {
          throw new ApolloError(
            `Order needs to have at least one item`,
            "INVALID_ITEMS_LENGTH"
          );
        }

        return ctx.prisma.order.create({
          data: {
            number,
            totalPrice: input.totalPrice,
            totalTax: input.totalTax,
            note: input.note,
            status: input.status || "NEW",
            urgency: input.urgency ?? 0,
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
