import { mutationField, arg, inputObjectType, nonNull } from "nexus";
import { hash } from "bcrypt";
import { UserRole as UserRolePrisma } from "@prisma/client";

import { UserRole } from "@backend/types";

export const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.field("role", { type: UserRole });
    t.string("name");
  },
});

export const AddUser = mutationField("addUser", {
  type: "User",
  args: {
    input: nonNull(arg({ type: CreateUserInput })),
  },
  resolve: async (_, { input: { email, name, password, role } }, ctx) => {
    const existingUser = await ctx.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error(`User with email "${email}" already exists`);
    }

    const hashedPwd = await hash(password, 10);

    const defaultRole = UserRolePrisma.FACTORY;

    const user = await ctx.prisma.user.create({
      data: { password: hashedPwd, name, email, role: role || defaultRole },
    });

    return user;
  },
});
