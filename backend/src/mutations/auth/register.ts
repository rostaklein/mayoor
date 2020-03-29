import { stringArg, mutationField, enumType, arg } from 'nexus';
import { hash } from 'bcrypt';
import { issueToken } from '../../auth';
import { NexusGenEnums } from '../../generated/nexus';

export const UserRole = enumType({
  name: 'UserRole',
  members: [
    'FACTORY', // lowest permissions, workers in production
    'ADMINISTRATION', // people in the office
    'EXECUTIVE', // CEO and others, highest permissions
  ],
});

export const Register = mutationField('register', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
    role: arg({ type: UserRole }),
    name: stringArg(),
  },
  resolve: async (_, { email, name, password, role }, ctx) => {
    const existingUser = await ctx.prisma.user.findOne({ where: { email } });

    if (existingUser) {
      throw new Error(`User with email "${email}" already exists`);
    }

    const hashedPwd = await hash(password, 10);

    const defaultRole: NexusGenEnums['UserRole'] = 'FACTORY';

    const user = await ctx.prisma.user.create({
      data: { password: hashedPwd, name, email, role: role || defaultRole },
    });

    const token = issueToken({ email: user.email, id: user.id });
    return { user, token };
  },
});
