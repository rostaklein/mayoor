import { OrderItemCreateWithoutOrderInput, Enumerable } from '@prisma/client';
import { NexusGenInputs } from '../generated/nexus';

export const mapOrderItemInputToCreateOrderItem = (
  items:
    | NexusGenInputs['OrderItemInput' | 'UpdateOrderItemInput'][]
    | null
    | undefined,
  createdByUserId: string,
): Enumerable<OrderItemCreateWithoutOrderInput> | undefined => {
  if (!items) {
    return;
  }

  return items.map((item) => {
    return {
      material: item.materialId
        ? { connect: { id: item.materialId } }
        : undefined,
      name: item.name,
      width: item.width,
      height: item.height,
      pieces: item.pieces,
      totalPrice: item.totalPrice,
      totalTax: item.totalTax,
      createdBy: {
        connect: {
          id: createdByUserId,
        },
      },
    };
  });
};
