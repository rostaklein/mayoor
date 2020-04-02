import { objectType } from 'nexus';
import { NexusGenEnums } from '../generated/nexus';
import { OrderStatus } from '.';

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.model.id();
    t.model.number();
    t.field('status', {
      resolve: (a) => a.status.toUpperCase() as NexusGenEnums['OrderStatus'],
      type: OrderStatus,
    });
    t.model.urgency();
    t.model.customer();
    t.model.items({ ordering: { createdAt: true } });
    t.model.totalPrice();
    t.model.totalTax();
    t.int('totalSize', {
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
          0,
        );
        return totalSize;
      },
    });
    t.model.shippedAt();
    t.model.note();
    t.model.urgency();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
