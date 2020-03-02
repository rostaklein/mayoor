import { rule, shield } from 'graphql-shield';
import { Context } from '../context';
import { ApolloError } from 'apollo-server-express';

const rules = {
  notProtected: rule()(() => {
    return true;
  }),
  isAuthenticatedUser: rule()(async (parent, args, context: Context) => {
    try {
      await context.user.getCurrentUser();
      return true;
    } catch (err) {
      return false;
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
      '*': rules.isAuthenticatedUser,
    },
    Mutation: {
      '*': rules.isAuthenticatedUser,
      login: rules.notProtected,
      register: rules.isAdmin,
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: new ApolloError('Not Authorized!', 'NOT_AUTHORIZED'),
  },
);
