import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

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
    viewer: User
    marketSnapshot: [MarketSnapshot]
  }
`;
