import { intArg, AllOutputTypes, objectType } from "nexus";

export const getPaginatedObjectType = (type: AllOutputTypes) =>
  objectType({
    name: `${type}Paginated`,
    definition(t) {
      t.int("totalCount");
      t.field("items", { type, list: true });
    },
  });

export const paginationArgs = {
  first: intArg({
    required: false,
  }),
  skip: intArg({
    required: false,
  }),
};
