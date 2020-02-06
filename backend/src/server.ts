import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';
import { createContext } from './context';

const PORT = 4444;

new GraphQLServer({ schema, context: createContext }).start(
  { port: PORT },
  () => console.log(`🚀 Server ready at: http://localhost:${PORT}`),
);
