import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Scalars['String'];
};

export type MarketSnapshot = {
  __typename?: 'MarketSnapshot';
  id: Scalars['String'];
  name: Scalars['String'];
  minPrice: Scalars['Float'];
  maxPrice: Scalars['Float'];
  medianPrice: Scalars['Float'];
  sumPrice: Scalars['Float'];
  averagePrice: Scalars['Float'];
  volume: Scalars['Int'];
  relativeMinPrice: Scalars['Float'];
  routineAt: Scalars['String'];
  lastUpdatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<User>;
  marketSnapshot?: Maybe<Array<Maybe<MarketSnapshot>>>;
};

export type MarketSnapshotFieldsFragment = (
  { __typename?: 'MarketSnapshot' }
  & Pick<MarketSnapshot, 'id' | 'name' | 'minPrice' | 'maxPrice' | 'medianPrice' | 'sumPrice' | 'averagePrice' | 'volume' | 'relativeMinPrice' | 'routineAt' | 'lastUpdatedAt'>
);

export type MarketSnapshotQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketSnapshotQuery = (
  { __typename?: 'Query' }
  & { marketSnapshot?: Maybe<Array<Maybe<(
    { __typename?: 'MarketSnapshot' }
    & MarketSnapshotFieldsFragment
  )>>> }
);

export const MarketSnapshotFieldsFragmentDoc = gql`
    fragment marketSnapshotFields on MarketSnapshot {
  id
  name
  minPrice
  maxPrice
  medianPrice
  sumPrice
  averagePrice
  volume
  relativeMinPrice
  routineAt
  lastUpdatedAt
}
    `;
export const MarketSnapshotDocument = gql`
    query MarketSnapshot {
  marketSnapshot {
    ...marketSnapshotFields
  }
}
    ${MarketSnapshotFieldsFragmentDoc}`;
export function useMarketSnapshotQuery(baseOptions?: Apollo.QueryHookOptions<MarketSnapshotQuery, MarketSnapshotQueryVariables>) {
        return Apollo.useQuery<MarketSnapshotQuery, MarketSnapshotQueryVariables>(MarketSnapshotDocument, baseOptions);
      }
export function useMarketSnapshotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketSnapshotQuery, MarketSnapshotQueryVariables>) {
          return Apollo.useLazyQuery<MarketSnapshotQuery, MarketSnapshotQueryVariables>(MarketSnapshotDocument, baseOptions);
        }
export type MarketSnapshotQueryHookResult = ReturnType<typeof useMarketSnapshotQuery>;
export type MarketSnapshotLazyQueryHookResult = ReturnType<typeof useMarketSnapshotLazyQuery>;
export type MarketSnapshotQueryResult = Apollo.QueryResult<MarketSnapshotQuery, MarketSnapshotQueryVariables>;
// Generated on 2020-11-06T20:08:25-03:00
