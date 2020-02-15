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

// apolloServer.setGraphQLPath('')

const app = express();

app.use(express.static('../frontend/build'));
app.get('/*', (req, res, next) => {
  if (req.path === apolloServer.graphqlPath) {
    next();
  }
  res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
});

apolloServer.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: ${apolloServer.graphqlPath}`);
});
