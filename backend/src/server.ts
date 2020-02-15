import { ApolloServer, gql } from 'apollo-server-express';
import { schema } from './schema';
import { createContext } from './context';
import { permissions } from './permissions';
import * as path from 'path';
import * as express from 'express';
import { applyMiddleware } from 'graphql-middleware';

const schemaWithMiddleware = applyMiddleware(schema, permissions);

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: createContext,
});

// server.express.use(express.static('../frontend/build'));
// server.express.get('/react', (req, res) => {
//   res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
// });

const app = express();

apolloServer.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: ${apolloServer.graphqlPath}`);
});
