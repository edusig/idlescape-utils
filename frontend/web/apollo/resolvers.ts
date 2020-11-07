import { Resolvers } from '@apollo/client';
import { marketSnapshot } from './resolvers/query/market-snapshot';

export const resolvers: Resolvers = {
  Query: {
    marketSnapshot,
    viewer: (_parent, _args, _context, _info) => {
      return { id: 1, name: 'John Smith', status: 'cached' };
    },
  },
};
