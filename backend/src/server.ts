import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { createContext } from './context';
import { permissions } from './permissions';

const server = new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
});

const PORT = 4444;
server.start({ port: PORT }, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`),
);
