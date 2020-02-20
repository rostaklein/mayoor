/**
 * Credits go to @queicherius who provided the original example:
 * https://github.com/prisma/photonjs/issues/321#issuecomment-568290134
 * The code below is a direct copy/paste and then adapation of it.
 */

export type ConnectionCursor = string;

export interface ConnectionArguments {
  before?: ConnectionCursor | null;
  after?: ConnectionCursor | null;
  first?: number | null;
  last?: number | null;
}

export interface PageInfo {
  startCursor?: ConnectionCursor;
  endCursor?: ConnectionCursor;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Edge<T> {
  node: T;
  cursor: ConnectionCursor;
}

export interface Connection<T> {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
}

/**
 * Supports the Relay Cursor Connection Specification
 *
 * @see https://facebook.github.io/relay/graphql/connections.htm
 */
export async function findManyCursor<Model extends { id: string }>(
  findMany: (args: ConnectionArguments) => Promise<Model[]>,
  args: ConnectionArguments = {} as ConnectionArguments,
): Promise<Connection<Model>> {
  if (args.first != null && args.first < 0) {
    throw new Error('first is less than 0');
  }
  if (args.last != null && args.last < 0) {
    throw new Error('last is less than 0');
  }

  const originalLength =
    args.first != null ? args.first : args.last != null ? args.last : undefined;

  // We will fetch an additional node so that we can determine if there is a
  // prev/next page
  const first = args.first != null ? args.first + 1 : undefined;
  const last = args.last != null ? args.last + 1 : undefined;

  // Execute the underlying findMany operation
  const nodes = await findMany({ ...args, first, last });
  console.log({ first, last, length: nodes.length });

  // Check if we actually got an additional node. This would indicate we have
  // a prev/next page
  const hasExtraNode = originalLength != null && nodes.length > originalLength;

  // Remove the extra node from the results
  if (hasExtraNode) {
    if (first != null) {
      nodes.pop();
    } else if (last != null) {
      nodes.shift();
    }
  }

  // Get the start and end cursors
  const startCursor = nodes.length > 0 ? nodes[0].id : undefined;
  const endCursor = nodes.length > 0 ? nodes[nodes.length - 1].id : undefined;

  // If paginating forward:
  // - For the next page, see if we had an extra node in the result set
  // - For the previous page, see if we are "after" another node (so there has
  //   to be more before this)
  // If paginating backwards:
  // - For the next page, see if we are "before" another node (so there has to be
  //   more after this)
  // - For the previous page, see if we had an extra node in the result set
  const hasNextPage = first != null ? hasExtraNode : args.before != null;
  const hasPreviousPage = first != null ? args.after != null : hasExtraNode;

  return {
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
    edges: nodes.map(node => ({ cursor: node.id, node })),
  };
}
