import { mutationField, idArg, nonNull } from "nexus";
import { ApolloError } from "apollo-server-micro";

export const DeleteUser = mutationField("deleteUser", {
  type: "User",
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, ctx) => {
    const user = await ctx.prisma.user.findUnique({ where: { id } });

    if (!user?.canBeEdited) {
      throw new ApolloError("You cant delete this user.", "INVALID_OPERATION");
    }

    return ctx.prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  },
});
