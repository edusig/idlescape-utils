import { Resolvers } from '@apollo/client';
import { marketSnapshot } from './resolvers/query/market-snapshot';

export const resolvers: Resolvers = {
  Query: {
    marketSnapshot,
  },
};
