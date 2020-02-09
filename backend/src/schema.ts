import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, objectType, intArg } from 'nexus';

import { Mutations } from './mutations';
import { Queries } from './queries';

require('dotenv').config();

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  },
});

const Order = objectType({
  name: 'Order',
  definition(t) {
    t.model.number();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const schema = makeSchema({
  types: [User, Order, AuthPayload, Mutations, Queries],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
