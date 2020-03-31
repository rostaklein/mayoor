import { queryField } from 'nexus';

export const GetAllUsers = queryField('getAllUsers', {
  type: 'User',
  list: true,
  resolve: async (_, __, ctx) => {
    return ctx.prisma.user.findMany();
  },
});
