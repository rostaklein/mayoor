import { mutationField, idArg } from 'nexus';

export const DeleteMaterial = mutationField('deleteMaterial', {
  type: 'Material',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.material.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
