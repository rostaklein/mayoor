import { objectType } from 'nexus';
import { GetGen, intArg, stringArg } from 'nexus/dist/core';

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('startCursor', {
      nullable: true,
    });
    t.string('endCursor', {
      nullable: true,
    });
    t.boolean('hasPreviousPage');
    t.boolean('hasNextPage');
  },
});

export const getEdgeObjectType = (type: GetGen<'allOutputTypes'>) =>
  objectType({
    name: `${type}Edge`,
    definition(t) {
      t.string('cursor');
      t.field('node', { type });
    },
  });

export const connectionArgs = {
  first: intArg({
    required: false,
  }),
  last: intArg({
    required: false,
  }),
  after: stringArg({
    required: false,
  }),
  before: stringArg({
    required: false,
  }),
};
