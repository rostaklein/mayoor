import { intArg, AllOutputTypes, objectType, list } from "nexus";

export const getPaginatedObjectType = (type: AllOutputTypes) =>
  objectType({
    name: `${type}Paginated`,
    definition(t) {
      t.int("totalCount");
      t.field("items", { type: list(type) });
    },
  });

export const paginationArgs = {
  first: intArg(),
  skip: intArg(),
};
