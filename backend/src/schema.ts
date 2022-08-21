import path from "path";
import { makeSchema } from "nexus";

import * as Mutations from "./mutations";
import * as Queries from "./queries";
import * as Types from "./types";

export const schema = makeSchema({
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
