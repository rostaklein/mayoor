import { mutationField, idArg, arg, inputObjectType } from 'nexus';
import { UserRole } from './addUser';
import { hash } from 'bcrypt';

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.string('email', { nullable: false });
    t.string('password');
    t.field('role', { type: UserRole });
    t.string('name');
  }
})

export const UpdateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
    input: arg({ type: UpdateUserInput, nullable: false })
  },
  resolve: async (_, { id, input }, ctx) => {
    const { password, ...rest } = input;

    if (password) {
      await ctx.prisma.user.update({
        where: { id }, data: {
          password: await hash(password, 10),
        }
      })
    }

    return ctx.prisma.user.update({
      where: { id }, data: {
        ...rest
      }
    });
  },
});
