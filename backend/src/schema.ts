import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from 'nexus';

import { Mutations } from './mutations';
import { Queries } from './queries';
import { type } from 'os';
import { Types } from './types';

require('dotenv').config();

export const schema = makeSchema({
  types: [Types, Mutations, Queries],
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
