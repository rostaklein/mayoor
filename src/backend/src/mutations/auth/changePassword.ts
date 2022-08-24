import { stringArg, mutationField, nonNull } from "nexus";
import { hash, compare } from "bcrypt";
import { ApolloError } from "apollo-server-micro";

export const ChangePassword = mutationField("changePassword", {
  type: "User",
  args: {
    oldPassword: nonNull(stringArg()),
    newPassword: nonNull(stringArg()),
  },
  resolve: async (_, { oldPassword, newPassword }, ctx) => {
    const { id } = await ctx.user.getCurrentUser();
    const user = await ctx.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error(`User with id "${id}" doesnt exist.`);
    }

    const isPasswordValid = await compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ApolloError("Incorrect old password", "INVALID_PASSWORD");
    }

    if (!user.canBeDeleted) {
      throw new ApolloError(
        "You cant change this users password.",
        "INVALID_OPERATION"
      );
    }

    const newHashedPwd = await hash(newPassword, 10);

    const updatedUser = ctx.prisma.user.update({
      where: { id },
      data: { password: newHashedPwd },
    });

    return updatedUser;
  },
});
