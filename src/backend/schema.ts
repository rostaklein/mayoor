import path from "path";

import { makeSchema } from "nexus";
import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);

import * as Mutations from "./mutations";
import * as Queries from "./queries";
import * as Types from "./types";

export const schema = makeSchema({
  types: [Types, Queries, Mutations, dateTimeScalar],
  outputs: {
    typegen: path.join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: path.join(process.cwd(), "src", "backend", "schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "src", "backend", "context.ts"),
    export: "Context",
  },
});
