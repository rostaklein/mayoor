export const mapOrderItemInputToCreateOrderItem = (
  items: {
    height?: number;
    materialId?: string;
    name?: string;
    pieces?: number;
    totalPrice: number;
    totalTax: number;
    width?: number;
  }[],
  createdByUserId: string
) => {
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
