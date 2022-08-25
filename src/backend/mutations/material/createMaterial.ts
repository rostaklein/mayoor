import { mutationField, stringArg, floatArg, nonNull } from "nexus";

export const CreateMaterial = mutationField("createMaterial", {
  type: "Material",
  args: {
    name: nonNull(stringArg()),
    price: nonNull(floatArg()),
  },
  resolve: async (_, { name, price }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    return ctx.prisma.material.create({
      data: {
        name,
        price,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  },
});
