import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { ItemDetail } from 'web/src/server/interfaces';
import { connectToDatabase } from 'web/src/server/mongodb';

export interface ItemDetailGetResponse {
  current?: ItemDetail;
  history: ItemDetail[];
}

const itemDetailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log('Called market snapshot');
    const db = await connectToDatabase();
    const mh = db.collection('market-history');
    const item = await mh.findOne({ itemID: parseInt(req.query.itemID as string, 10) });
    console.log('ITEM', item);
    if (item != null) {
      console.log('FOUND IN MONGO');
      return res.json({ current: item.history[0], history: item.history });
    }

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

    if (item == null) {
      await mh.insertOne({
        itemID: parseInt(req.query.itemID as string, 10),
        history,
        createdAtTime: new Date().getTime(),
      });
    }

    res.json({ current, history });
  } else {
    res.status(405);
  }
};

export default itemDetailHandler;
