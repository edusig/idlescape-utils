import { BulkWriteOperation } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { CacheItem } from 'web/src/server/interfaces';
import { connectToDatabase } from 'web/src/server/mongodb';

export const updateMarketPricesCache = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Updates market prices snapshot
    const ops = req.body.map(
      (it: CacheItem): BulkWriteOperation<any> => ({
        updateOne: { filter: { itemID: it.itemID }, update: { $set: it }, upsert: true },
      })
    );
    const db = await connectToDatabase();
    const ms = db.collection('market-snapshot');
    await ms.bulkWrite(ops);

    // Updates market history for cached items
    const mh = db.collection('market-history');
    const items = await mh.find().sort({ createdAtTime: -1 }).toArray();
    if (items.length > 20) {
      mh.deleteMany({ _id: { $in: items.slice(20).map(it => it._id) } });
    }
    const itemIDs = items.slice(0, 20).map(it => it.itemID);
    const hops = req.body
      .filter((it: CacheItem) => itemIDs.includes(it.itemID))
      .map(
        (it: CacheItem): BulkWriteOperation<{}> => ({
          updateOne: { filter: { itemID: it.itemID }, update: { $push: { history: it } } },
        })
      );
    await ms.bulkWrite(hops);

    res.end();
  } else {
    res.status(405);
  }
};

export default updateMarketPricesCache;
