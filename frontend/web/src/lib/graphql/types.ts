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
