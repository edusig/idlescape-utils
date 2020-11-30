import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'web/src/server/mongodb';

export interface MarketPricesItemDetail {
  itemID: string;
  name: string;
  minPrice: number;
  volume: number;
  offerCount: number;
  routineAtTime: number;
}

export interface MarketPricesGetResponse {
  marketPrices: MarketPricesItemDetail[];
}

const marketPricesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    const items = await db.collection('market-snapshot').find().sort({ itemID: 1 }).toArray();
    res.json({ marketPrices: items });
  } else {
    res.status(405);
  }
};

export default marketPricesHandler;
