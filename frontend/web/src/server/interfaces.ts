export interface FullItem {
  name: string;
  minPrice: number;
  maxPrice: number;
  medianPrice: number;
  sumPrice: number;
  meanPrice: number;
  volume: number;
  offerCount: number;
  relativeMinPriceFirst5: number;
  relativeMinPriceFirst10: number;
  relativeMinPriceFirst5Pct: number;
  relativeMinPriceFirst10Pct: number;
  relativeMinPriceFirst15Pct: number;
  stdDeviation: number;
  routineAt: string;
  routineAtTime: number;
  updatedAt: string;
  updatedAtTime: number;
}

export interface ItemDetail extends FullItem {
  id: string;
}

export interface CacheItem extends FullItem {
  itemID: string;
}
