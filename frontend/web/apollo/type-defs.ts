import { gql } from '@apollo/client';

export const typeDefs = gql`
  type MarketSnapshot {
    id: String!
    name: String!
    minPrice: Float!
    maxPrice: Float!
    medianPrice: Float!
    sumPrice: Float!
    averagePrice: Float!
    volume: Int!
    relativeMinPrice: Float!
    routineAt: String!
    lastUpdatedAt: String!
  }

  type Query {
    marketSnapshot: [MarketSnapshot]
  }
`;
