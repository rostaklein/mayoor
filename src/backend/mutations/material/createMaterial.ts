import { mutationField, stringArg, floatArg } from "nexus";

export const CreateMaterial = mutationField("createMaterial", {
  type: "Material",
  args: {
    name: stringArg({ nullable: false }),
    price: floatArg({ nullable: false }),
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
