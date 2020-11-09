import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema } from '@nexus/schema';

import * as Mutations from './mutations';
import * as Queries from './queries';
import * as Types from './types';

require('dotenv').config();

export const schema = makeSchema({
  types: [Types, Mutations, Queries],
  plugins: [nexusSchemaPrisma()],
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
