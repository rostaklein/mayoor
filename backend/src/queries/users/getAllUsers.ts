import { queryField } from '@nexus/schema';

export const GetAllUsers = queryField('getAllUsers', {
  type: 'User',
  list: true,
  resolve: async (_, __, ctx) => {
    return ctx.prisma.user.findMany({ where: { deleted: false } });
  },
});
