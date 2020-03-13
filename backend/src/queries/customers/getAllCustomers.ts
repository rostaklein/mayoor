import { queryField, stringArg } from 'nexus';
import { FindManyCustomerArgs } from '@prisma/client';
import { paginationArgs, getPaginatedObjectType } from '../../utils/pagination';

export const GetAllCustomers = queryField('getAllCustomers', {
  type: getPaginatedObjectType('Customer'),
  args: { ...paginationArgs, search: stringArg({ required: false }) },
  nullable: false,
  resolve: async (_parent, { search, ...args }, ctx) => {
    const searchWhereArg: FindManyCustomerArgs['where'] = {
      OR: [
        {
          personName: { contains: search },
        },
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { identificationNumber: { contains: search } },
      ],
    };
    const where = search ? searchWhereArg : undefined;
    const allCustomers = await ctx.prisma.customer.findMany({
      where,
    });

    const customers = await ctx.prisma.customer.findMany({
      ...args,
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      totalCount: allCustomers.length,
      items: customers,
    };
  },
});
