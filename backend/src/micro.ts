import { VercelApiHandler } from "@vercel/node";
import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { createContext } from "./context";
// import { applyMiddleware } from "graphql-middleware";
import { schema } from "./schema";
// import { permissions } from "./permissions";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema,
  context: (params: { req: MicroRequest }) => createContext(params.req),
});

let apolloServerHandler: VercelApiHandler;

export async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}
