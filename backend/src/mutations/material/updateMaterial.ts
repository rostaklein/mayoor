import { mutationField, stringArg, floatArg, idArg } from '@nexus/schema';

export const UpdateMaterial = mutationField('updateMaterial', {
  type: 'Material',
  args: {
    id: idArg({ nullable: false }),
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
