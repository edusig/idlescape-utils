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
