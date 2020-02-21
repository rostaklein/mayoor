import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from 'nexus';

import * as Mutations from './mutations';
import * as Queries from './queries';
import * as Types from './types';
import { PageInfo } from './utils/connection';

require('dotenv').config();

export const schema = makeSchema({
  types: [Types, Mutations, Queries, PageInfo],
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
