import { mutationField, stringArg, floatArg, idArg, nonNull } from "nexus";

export const UpdateMaterial = mutationField("updateMaterial", {
  type: "Material",
  args: {
    id: nonNull(idArg()),
    name: stringArg(),
    price: floatArg(),
  },
  resolve: async (_, { id, name, price }, ctx) => {
    return ctx.prisma.material.update({
      data: {
        name: name ?? undefined,
        price: price ?? undefined,
      },
      where: {
        id,
      },
    });
  },
});
