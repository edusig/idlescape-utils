import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export interface MarketPricesGetResponse {
  marketPrices: {
    id: string;
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
  }[];
}

const marketPricesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log('Called market snapshot');
    let api = await fetch('***REMOVED***');
    const apiData = await api.json();
    const data = apiData.map((it: any) => {
      let data: any = {};
      try {
        data = JSON.parse(it.data);
      } catch (e) {
        console.error(e);
      }
      return {
        id: it.id,
        routineAtTime: it.routineAtTime,
        ...data,
      };
    });
    res.json({ marketPrices: data });
  } else {
    res.status(405);
  }
};

export default marketPricesHandler;
