import { queryField, booleanArg, list } from "nexus";
import { MaterialType } from "../../types";

export const GetAllMaterials = queryField("getAllMaterials", {
  type: list(MaterialType),
  args: {
    deleted: booleanArg({ default: false }),
  },
  resolve: async (_, args, ctx) => {
    return ctx.prisma.material.findMany({
      where: { deleted: args.deleted || false },
    });
  },
});
