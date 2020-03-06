import { queryField } from 'nexus';

export const GetAllMaterials = queryField('getAllMaterials', {
  type: 'Material',
  list: true,
  resolve: async (_, __, ctx) => {
    return ctx.prisma.material.findMany();
  },
});
