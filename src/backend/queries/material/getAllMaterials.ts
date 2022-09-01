import { queryField, booleanArg, list, nonNull } from "nexus";

import { MaterialType } from "@backend/types";

export const GetAllMaterials = queryField("getAllMaterials", {
  type: list(nonNull(MaterialType)),
  args: {
    deleted: booleanArg({ default: false }),
  },
  resolve: async (_, args, ctx) => {
    return ctx.prisma.material.findMany({
      where: { deleted: args.deleted || false },
    });
  },
});
