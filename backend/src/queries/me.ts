import { queryField } from "nexus";

export const Me = queryField("me", {
  type: "User",
  resolve: async (_, __, ctx) => {
    const userContext = await ctx.user.getCurrentUser();

    const user = await ctx.prisma.user.findUnique({
      where: { id: userContext.id },
    });

    if (!user || user.deleted) {
      throw new Error("User not found");
    }

    return user;
  },
});
