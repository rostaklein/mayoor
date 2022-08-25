import { objectType } from "nexus";
import { Order, OrderStatus } from "nexus-prisma";

export const OrderType = objectType({
  name: Order.$name,
  definition(t) {
    t.id("id");
    t.int("number");
    t.field(Order.id);
    t.field(Order.number);
    t.field(Order.status);
    t.field(Order.urgency);
    t.field(Order.customer);
    t.field(Order.items, {
      resolve: (source, args, ctx) =>
        ctx.prisma.orderItem.findMany({
          where: { orderId: source.id },
          orderBy: { createdAt: "desc" },
        }),
    });
    t.field(Order.totalPrice);
    t.field(Order.totalTax);
    t.float("totalSize", {
      resolve: async (order, _, ctx) => {
        const orderItems = await ctx.prisma.orderItem.findMany({
          where: { order: { id: order.id } },
        });

        const totalSize = orderItems.reduce(
          (acc, { width, height, pieces }) => {
            if (width === null || height === null || pieces === null) {
              return acc;
            }
            const size = Math.floor(width * height * pieces * 10) / 10;
            return (acc += size);
          },
          0
        );
        return totalSize;
      },
    });
    t.field(Order.shippedAt);
    t.field(Order.note);
    t.field(Order.urgency);
    t.field(Order.createdBy);
    t.field(Order.createdAt);
    t.field(Order.updatedAt);
  },
});
