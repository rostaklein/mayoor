import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { createContext } from './context';
import { permissions } from './permissions';
import path from 'path';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';

const schemaWithMiddleware = applyMiddleware(schema, permissions);

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: createContext,
  formatError: (error) => {
    console.error(`Apollo Server Error: ` + error.message);
    return error;
  },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

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
  console.log(
    `🚀 GraphQL server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
  );
});
