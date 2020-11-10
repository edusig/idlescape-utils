import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export interface MarketPricesGetResponse {
  marketPrices: {
    id: string;
    name: string;
    minPrice: number;
    volume: number;
    offerCount: number;
    routineAtTime: number;
  }[];
}

const marketPricesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log('Called market snapshot');
    let api = await fetch('***REMOVED***', {
      headers: { 'X-Api-Key': process.env.SB_API_KEY || '' },
    });
    const apiData = await api.json();
    if (!Array.isArray(apiData)) {
      return res.json({ marketPrices: [] });
    }
    const data = apiData.map((it: any) => {
      let data: any = {};
      try {
        data = JSON.parse(it.data);
      } catch (e) {
        console.error(e);
      }
      return {
        id: it.id,
        name: data.name,
        minPrice: data.minPrice,
        volume: data.volume,
        offerCount: data.offerCount,
        routineAtTime: parseInt(it.routineAtTime, 10),
      };
    });
    res.json({ marketPrices: data });
  } else {
    res.status(405);
  }
};

export default marketPricesHandler;
