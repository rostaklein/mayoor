import { mutationField, idArg } from 'nexus';

export const DeleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    return ctx.prisma.user.delete({ where: { id } });
  },
});
