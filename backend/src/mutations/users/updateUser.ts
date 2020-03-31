import { mutationField, idArg, arg } from 'nexus';
import { UserInput } from './addUser';
import { hash } from 'bcrypt';

export const UpdateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    id: idArg({ nullable: false }),
    input: arg({type: UserInput, nullable: false})
  },
  resolve: async (_, { id, input }, ctx) => {
    const {password, ...rest} = input;
    const hashedPwd = await hash(password, 10);
    return ctx.prisma.user.update({ where: { id }, data: {
      password: hashedPwd,
      ...rest
    } });
  },
});
