import { Prisma } from "@prisma/client";
import { queryField, stringArg } from "nexus";

import { paginationArgs, getPaginatedObjectType } from "../../utils/pagination";

export const GetAllCustomers = queryField("getAllCustomers", {
  type: getPaginatedObjectType("Customer"),
  args: { ...paginationArgs, search: stringArg() },
  resolve: async (_parent, { first, skip, search }, ctx) => {
    const where: Prisma.CustomerWhereInput = {
      name: { contains: search ?? "", mode: "insensitive" },
      deleted: false,
    };

    const totalCustomers = await ctx.prisma.customer.count({ where });
    const customers = await ctx.prisma.customer.findMany({
      skip: skip ?? undefined,
      take: first ?? undefined,
      where,
    });

    return {
      totalCount: totalCustomers,
      items: customers,
    };
  },
});
