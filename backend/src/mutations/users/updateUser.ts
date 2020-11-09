import { mutationField, idArg, arg, inputObjectType } from '@nexus/schema';
import { UserRole } from './addUser';
import { hash } from 'bcrypt';

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.string('email', { nullable: false });
    t.string('password');
    t.field('role', { type: UserRole });
    t.string('name');
  },
});

export const UpdateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
    input: arg({ type: UpdateUserInput, nullable: false }),
  },
  resolve: async (_, { id, input }, ctx) => {
    const { password, role, ...rest } = input;

    if (password) {
      await ctx.prisma.user.update({
        where: { id },
        data: {},
      });
    }

    return ctx.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        password: password ? await hash(password, 10) : undefined,
        role: role ?? undefined,
      },
    });
  },
});
