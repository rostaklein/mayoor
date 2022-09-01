export const mapOrderItemInputToCreateOrderItem = (
  items: {
    // input type
    height?: number | null; // Float
    materialId?: string | null; // ID
    name?: string | null; // String
    pieces?: number | null; // Int
    totalPrice: number; // Float!
    totalTax: number; // Float!
    width?: number | null; // Float
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
