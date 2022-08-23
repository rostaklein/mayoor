import path from "path";
import { asNexusMethod, makeSchema } from "nexus";

import { GraphQLScalarType } from "graphql";
import { DateTimeResolver } from "graphql-scalars";

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);

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
  types: [],
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
