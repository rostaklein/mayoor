import { stringArg, mutationField } from 'nexus';
import { hash } from 'bcrypt';
import { issueToken } from '../../auth';

export const Register = mutationField('register', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
    name: stringArg(),
  },
  resolve: async (_, { email, name, password }, ctx) => {
    const existingUser = await ctx.prisma.user.findOne({ where: { email } });

    if (existingUser) {
      throw new Error(`User with email "${email}" already exists`);
    }

    const hashedPwd = await hash(password, 10);

    const user = await ctx.prisma.user.create({
      data: { password: hashedPwd, name, email, role: 'USER' },
    });

    const token = issueToken({ email: user.email, id: user.id });
    return { user, token };
  },
});
