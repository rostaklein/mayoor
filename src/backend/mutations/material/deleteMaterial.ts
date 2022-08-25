import { mutationField, idArg, nonNull } from "nexus";

export const DeleteMaterial = mutationField("deleteMaterial", {
  type: "Material",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.material.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
