import { queryField, stringArg } from 'nexus';
import { Customer } from '@prisma/client';
import { paginationArgs, getPaginatedObjectType } from '../../utils/pagination';

export const GetAllCustomers = queryField('getAllCustomers', {
  type: getPaginatedObjectType('Customer'),
  args: { ...paginationArgs, search: stringArg({ required: false }) },
  nullable: false,
  resolve: async (_parent, { search = '', ...args }, ctx) => {
    const ilike = search ? `%${search}%` : '%%';

    const allCustomers = await ctx.prisma.raw<
      Customer[]
    >`SELECT * FROM "Customer" AS t WHERE NOT "deleted" AND t::text ILIKE ${ilike}`;

    const paginatedCustomers = await ctx.prisma.raw<
      Customer[]
    >`SELECT * FROM "Customer" AS t
      WHERE NOT "deleted"
      AND t::text ILIKE ${ilike}
      ORDER BY "createdAt" DESC
      LIMIT ${args.first || 'ALL'}
      OFFSET ${args.skip || 0}
    `;

    return {
      totalCount: allCustomers.length,
      items: paginatedCustomers,
    };
  },
});
