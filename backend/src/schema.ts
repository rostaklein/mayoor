import path from "path";
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

import * as Mutations from "./mutations";
import * as Queries from "./queries";
import * as Types from "./types";

export const schema = makeSchema({
  sourceTypes: {
    modules: [
      {
        module: require.resolve(".prisma/client/index.d.ts"),
        alias: "prisma",
      },
    ],
  },
  plugins: [nexusPrisma()],
  types: [Types, Queries, Mutations],
  outputs: {
    schema: path.resolve("./backend/src/generated/schema.graphql"),
    typegen: path.resolve("./backend/src/generated/nexus.ts"),
  },
  contextType: {
    module: require.resolve("./context"),
    alias: "Context",
    export: "Context",
  },
});
