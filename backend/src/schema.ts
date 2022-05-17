import path from "path";
import { makeSchema } from "nexus";

// import * as Mutations from "./mutations";
import * as Queries from "./queries";
import * as Types from "./types";

export const schema = makeSchema({
  types: [Types, Queries],
  outputs: {
    schema: path.resolve("../../generated/schema.graphql"),
    typegen: path.resolve("../../generated/nexus.ts"),
  },
  contextType: {
    module: require.resolve("./context"),
    alias: "Context",
    export: "Context",
  },
});
