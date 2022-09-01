import { intArg, AllOutputTypes, objectType, list, nonNull } from "nexus";

export const getPaginatedObjectType = (type: AllOutputTypes) =>
  objectType({
    name: `${type}Paginated`,
    definition(t) {
      t.int("totalCount");
      t.field("items", { type: list(nonNull(type)) });
    },
  });

export const paginationArgs = {
  first: intArg(),
  skip: intArg(),
};
