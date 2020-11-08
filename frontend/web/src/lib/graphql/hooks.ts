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

export type MarketSnapshot = {
  __typename?: 'MarketSnapshot';
  id: Scalars['ID'];
  name: Scalars['String'];
  minPrice: Scalars['Float'];
  maxPrice: Scalars['Float'];
  medianPrice: Scalars['Float'];
  sumPrice: Scalars['Float'];
  meanPrice: Scalars['Float'];
  volume: Scalars['Int'];
  offerCount: Scalars['Int'];
  relativeMinPriceFirst5: Scalars['Float'];
  relativeMinPriceFirst10: Scalars['Float'];
  relativeMinPriceFirst5Pct: Scalars['Float'];
  relativeMinPriceFirst10Pct: Scalars['Float'];
  relativeMinPriceFirst15Pct: Scalars['Float'];
  stdDeviation: Scalars['Float'];
  routineAt: Scalars['String'];
  routineAtTime: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedAtTime: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  marketSnapshot?: Maybe<Array<Maybe<MarketSnapshot>>>;
};

export type MarketSnapshotFieldsFragment = (
  { __typename?: 'MarketSnapshot' }
  & Pick<MarketSnapshot, 'id' | 'name' | 'minPrice' | 'maxPrice' | 'medianPrice' | 'sumPrice' | 'meanPrice' | 'volume' | 'offerCount' | 'relativeMinPriceFirst5' | 'relativeMinPriceFirst10' | 'relativeMinPriceFirst5Pct' | 'relativeMinPriceFirst10Pct' | 'relativeMinPriceFirst15Pct' | 'stdDeviation' | 'routineAt' | 'routineAtTime' | 'updatedAt' | 'updatedAtTime'>
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
  meanPrice
  volume
  offerCount
  relativeMinPriceFirst5
  relativeMinPriceFirst10
  relativeMinPriceFirst5Pct
  relativeMinPriceFirst10Pct
  relativeMinPriceFirst15Pct
  stdDeviation
  routineAt
  routineAtTime
  updatedAt
  updatedAtTime
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
// Generated on 2020-11-07T16:23:02-03:00
