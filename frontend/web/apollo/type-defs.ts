import { gql } from '@apollo/client';

export const typeDefs = gql`
  type MarketSnapshot {
    id: ID!
    name: String!
    minPrice: Float!
    maxPrice: Float!
    medianPrice: Float!
    sumPrice: Float!
    meanPrice: Float!
    volume: Int!
    offerCount: Int!
    relativeMinPriceFirst5: Float!
    relativeMinPriceFirst10: Float!
    relativeMinPriceFirst5Pct: Float
    relativeMinPriceFirst10Pct: Float
    relativeMinPriceFirst15Pct: Float
    stdDeviation: Float!
    routineAt: String!
    routineAtTime: Float!
    updatedAt: String!
    updatedAtTime: Float!
  }

  type Query {
    marketSnapshot: [MarketSnapshot]
  }
`;
