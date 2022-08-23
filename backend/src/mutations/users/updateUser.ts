import { mutationField, idArg, arg, inputObjectType, nonNull } from "nexus";
import { hash } from "bcrypt";
import { ApolloError } from "apollo-server-micro";
import { UserRole } from "../../types";

export const UpdateUserInput = inputObjectType({
  name: "UpdateUserInput",
  definition(t) {
    t.nonNull.string("email");
    t.string("password");
    t.field("role", { type: UserRole });
    t.string("name");
  },
});

export const UpdateUser = mutationField("updateUser", {
  type: "User",
  args: {
    id: nonNull(idArg()),
    input: nonNull(arg({ type: UpdateUserInput })),
  },
  resolve: async (_, { id, input }, ctx) => {
    const { password, role, ...rest } = input;

    const user = await ctx.prisma.user.findUnique({ where: { id } });

    if (!user?.canBeDeleted) {
      throw new ApolloError(
        "You cant change this users password.",
        "INVALID_OPERATION"
      );
    }

    if (password) {
      await ctx.prisma.user.update({
        where: { id },
        data: {},
      });
    }

    return ctx.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        password: password ? await hash(password, 10) : undefined,
        role: role ?? undefined,
      },
    });
  },
});
