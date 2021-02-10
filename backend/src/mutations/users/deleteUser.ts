import { mutationField, idArg } from '@nexus/schema';
import { ApolloError } from 'apollo-server-express';

export const DeleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
  },
  resolve: async (_, { id }, ctx) => {
    const user = await ctx.prisma.user.findOne({ where: { id } });

    if (!user?.canBeDeleted) {
      throw new ApolloError('You cant delete this user.', 'INVALID_OPERATION');
    }

    return ctx.prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
