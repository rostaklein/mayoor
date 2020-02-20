import { queryField, objectType } from 'nexus';
import { findManyCursor } from '../../utils/findManyCursor';
import { getEdgeObjectType, connectionArgs } from '../../utils/connection';

export const CustomersConnection = objectType({
  name: 'CustomersConnection',
  definition(t) {
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
  args: connectionArgs,
  nullable: false,
  resolve: async (_parent, args, ctx) => {
    return findManyCursor(_args => ctx.prisma.customer.findMany(_args), args);
  },
});
