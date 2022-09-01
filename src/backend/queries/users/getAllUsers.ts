import { list, nonNull, queryField } from "nexus";

import { UserType } from "@backend/types";

export const GetAllUsers = queryField("getAllUsers", {
  type: list(nonNull(UserType)),
  resolve: async (_, __, ctx) => {
    return ctx.prisma.user.findMany({ where: { deleted: false } });
  },
});
