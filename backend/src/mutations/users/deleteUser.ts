import { mutationField, idArg } from '@nexus/schema';

export const DeleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
