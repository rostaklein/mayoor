import { rule, shield } from 'graphql-shield';
import { Context } from '../context';

const rules = {
  isAuthenticatedUser: rule()(async (parent, args, context: Context) => {
    try {
      await context.user.getCurrentUser();
    } catch (err) {
      return false;
    } finally {
      return true;
    }
  }),
  isAdmin: rule()(async (parent, args, context: Context) => {
    const { id } = await context.user.getCurrentUser();
    const user = await context.prisma.user.findOne({ where: { id } });
    return user?.role === 'ADMIN';
  }),
};

export const permissions = shield(
  {
    Query: {
      getAllOrders: rules.isAuthenticatedUser,
    },
    Mutation: {
      createOrder: rules.isAuthenticatedUser,
      register: rules.isAdmin,
    },
  },
  { allowExternalErrors: true },
);
