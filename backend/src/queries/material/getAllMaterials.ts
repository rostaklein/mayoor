import { queryField, booleanArg } from '@nexus/schema';

export const GetAllMaterials = queryField('getAllMaterials', {
  type: 'Material',
  list: true,
  args: {
    deleted: booleanArg({ default: false }),
  },
  resolve: async (_, args, ctx) => {
    return ctx.prisma.material.findMany({
      where: { deleted: args.deleted || false },
    });
  },
});
