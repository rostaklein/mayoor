import { queryField, objectType, stringArg } from 'nexus';
import { findManyCursor } from '../../utils/findManyCursor';
import { getEdgeObjectType, connectionArgs } from '../../utils/connection';
import { FindManyCustomerArgs } from '@prisma/client';

export const CustomersConnection = objectType({
  name: 'CustomersConnection',
  definition(t) {
    t.int('totalCount');
    t.field('pageInfo', {
      type: 'PageInfo',
    });
    t.list.field('edges', {
      type: 'CustomerEdge',
    });
  },
});

export const CustomerEdge = getEdgeObjectType('Customer');

export const GetAllCustomers = queryField('getAllCustomers', {
  type: 'CustomersConnection',
  args: { ...connectionArgs, search: stringArg({ required: false }) },
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

    const customers = await findManyCursor(
      _args =>
        ctx.prisma.customer.findMany({
          ..._args,
          where,
        }),

      args,
    );
    return {
      totalCount: allCustomers.length,
      ...customers,
    };
  },
});
