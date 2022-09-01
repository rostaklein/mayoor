import { list, queryField } from "nexus";

import { UserType } from "@backend/types";

export const GetAllUsers = queryField("getAllUsers", {
  type: list(UserType),
  resolve: async (_, __, ctx) => {
    return ctx.prisma.user.findMany({ where: { deleted: false } });
  },
});
