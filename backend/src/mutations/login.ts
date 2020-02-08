import { stringArg, mutationField } from 'nexus';
import { compare } from 'bcrypt';
import { issueToken } from '../auth';

export const Login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_, { email, password }, ctx) => {
    const user = await ctx.prisma.user.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = issueToken({ email: user.email, id: user.id });
    return { user, token };
  },
});
