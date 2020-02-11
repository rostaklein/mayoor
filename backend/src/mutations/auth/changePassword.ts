import { stringArg, mutationField } from 'nexus';
import { hash, compare } from 'bcrypt';
import { ApolloError } from 'apollo-server';

export const ChangePassword = mutationField('changePassword', {
  type: 'User',
  args: {
    oldPassword: stringArg({ nullable: false }),
    newPassword: stringArg({ nullable: false }),
  },
  resolve: async (_, { oldPassword, newPassword }, ctx) => {
    const { id } = await ctx.user.getCurrentUser();
    const user = await ctx.prisma.user.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with id "${id}" doesnt exist.`);
    }

    const isPasswordValid = await compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ApolloError('Incorrect old password', 'INVALID_PASSWORD');
    }

    const newHashedPwd = await hash(newPassword, 10);

    const updatedUser = ctx.prisma.user.update({
      where: { id },
      data: { password: newHashedPwd },
    });

    return updatedUser;
  },
});
