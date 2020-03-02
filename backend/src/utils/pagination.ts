import { intArg, GetGen, objectType } from 'nexus/dist/core';

export const getPaginatedObjectType = (type: GetGen<'allOutputTypes'>) =>
  objectType({
    name: `${type}Paginated`,
    definition(t) {
      t.int('totalCount');
      t.field('items', { type, list: true });
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
