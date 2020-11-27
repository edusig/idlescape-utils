import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export interface ItemDetail {
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
}

export interface ItemDetailGetResponse {
  current?: ItemDetail;
  history: ItemDetail[];
}

const itemDetailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log('Called market snapshot');
    let api = await fetch(`${process.env.SB_API_URL}/tabs/market-history/id/${req.query.itemID}`, {
      headers: { 'X-Api-Key': process.env.SB_API_KEY || '' },
    });
    const apiData = await api.json();
    if (!Array.isArray(apiData)) {
      return res.json({ current: null, history: [] });
    }
    const history = apiData.reverse().map((it: any) => {
      let data: any = {};
      try {
        data = JSON.parse(it.data);
      } catch (e) {
        console.error(e);
      }
      return {
        id: it.id,
        ...data,
        updatedAtTime: parseInt(it.updatedAtTime, 10),
        routineAtTime: parseInt(it.routineAtTime, 10),
      };
    });
    const current = history[0];
    res.json({ current, history });
  } else {
    res.status(405);
  }
};

export default itemDetailHandler;
