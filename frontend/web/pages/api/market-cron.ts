import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import io from 'socket.io-client';

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

const marketCronHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401);
  }
  if (req.method === 'GET') {
    console.log('Called market cron');
    await cron();
    res.json({ status: 'ok' });
  } else {
    res.status(405);
  }
};

// Sheet.Best Configs
const sbApi = process.env.SB_API_URL || '';
const sbApiKey = process.env.SB_API_KEY || '';
const reqHeaders = { 'Content-Type': 'application/json', 'X-Api-Key': sbApiKey };
const deleteHeaders = { 'X-Api-Key': sbApiKey };

// Socket.io initialization
const jwt = process.env.IDLESCAPE_JWT_TOKEN;

// Constants
// Max time of 10 min to resolve the routine
const ROUTINE_TIMEOUT = 10 * 60 * 1000;
// Every 1secs (+/- 500ms)
const ITEM_ROUTINE_TIMEOUT = 400;
const ITEM_RAND_TIMEOUT = 200;

// Utilitary functions
const getItemIds = (newItems: any[]) => newItems.slice(0).map(it => it.itemID);

const chooseRandomItem = (items: any[], count: number): number => {
  console.log(
    'Picking item',
    count - (items.length - 1),
    'of',
    count,
    `(${(((count - (items.length - 1)) / count) * 100).toFixed(2)}%) -`
  );
  const idx = Math.floor(Math.random() * (items.length - 1));
  return idx;
};

const getRelativeMin = (data: any[]) =>
  Math.floor(
    data.reduce((acc: any, it: any) => acc + it.price * it.stackSize, 0) /
      data.reduce((acc: any, it: any) => acc + it.stackSize, 0)
  );
const getPercent = (data: any[], percent: any) => {
  const pct = Math.ceil(data.length * percent);
  return pct >= 1 ? pct : 1;
};

const processItemData = (data: any, routineTime: Date) => {
  if (data.length <= 0) {
    return null;
  }
  const middle = Math.floor((data.length - 1) / 2);
  const medianData = data[!isNaN(middle) && middle >= 0 ? middle : 0];
  const median =
    medianData != null && medianData.hasOwnProperty('price') ? medianData.price : data[0].price;
  // Removes outliers (Price > 1 Billion or 100x greater than the median)
  const filtered = data.filter((it: any) => it.price <= 1000000000 && it.price <= median * 100);
  const sum = filtered.reduce((acc: any, it: any) => acc + it.price, 0);
  const mean = sum / filtered.length;
  return {
    id: filtered[0].itemID,
    routineAtTime: routineTime.getTime(),
    data: JSON.stringify({
      name: filtered[0].name,
      minPrice: filtered[0].price,
      maxPrice: filtered[filtered.length - 1].price,
      medianPrice: filtered[Math.floor((filtered.length - 1) / 2)].price,
      sumPrice: sum,
      meanPrice: mean,
      volume: filtered.reduce((acc: any, it: any) => acc + it.stackSize, 0),
      offerCount: data.length,
      relativeMinPriceFirst5: getRelativeMin(filtered.slice(0, 5)),
      relativeMinPriceFirst10: getRelativeMin(filtered.slice(0, 10)),
      relativeMinPriceFirst5Pct: getRelativeMin(filtered.slice(0, getPercent(filtered, 0.05))),
      relativeMinPriceFirst10Pct: getRelativeMin(filtered.slice(0, getPercent(filtered, 0.1))),
      relativeMinPriceFirst15Pct: getRelativeMin(filtered.slice(0, getPercent(filtered, 0.15))),
      stdDeviation: Math.sqrt(
        filtered.reduce((acc: any, it: any) => acc + Math.pow(it.price - mean, 2), 0) /
          filtered.length
      ),
      routineAt: routineTime.toISOString(),
      updatedAt: new Date().toISOString(),
      updatedAtTime: new Date().getTime(),
    }),
  };
};

const updatesSheetItems = async (queue: any[]) => {
  try {
    console.log('ABOUT TO WRITE TO THE SPREADSHEET', new Date());
    await fetch(`${sbApi}/0:400`, {
      headers: deleteHeaders,
      method: 'DELETE',
    });
    await fetch(sbApi, {
      headers: reqHeaders,
      body: JSON.stringify(queue),
      method: 'POST',
    });
    await fetch(`${sbApi}/tabs/market-history`, {
      headers: reqHeaders,
      body: JSON.stringify(queue),
      method: 'POST',
    });
    console.log('SPREADSHEET UPDATED', new Date());
  } catch (e) {
    console.log('Errored at:', new Date().toISOString());
    console.error(e);
    throw e;
  }
};

const cron = async () => {
  return new Promise(async (resolve, reject) => {
    // Shared values
    let itemQueue: any[] = [];
    let processedQueue: any[] = [];
    let routineTime: Date;
    let routineCount = 0;
    const socket = io('wss://idlescape.com', {
      query: { token: `Bearer ${jwt}` },
      reconnection: true,
      forceNew: true,
    });

    // Socket message handlers
    socket.on('pong', (data: any) => socket.emit('latency', data));
    socket.on('get market manifest', (data: any) => {
      console.log('Updating market,', data.length, 'items found.');
      routineTime = new Date();
      routineCount = data.length;
      itemQueue = getItemIds(data);
      itemRoutine();
    });
    socket.on('get player marketplace items', (data: any) => {
      const body = processItemData(data, routineTime);
      if (body != null) {
        processedQueue.push(body);
      }
    });

    // Main routines (Socket message senders)
    const marketRoutine = () => {
      console.log('ITS TIME TO UPDATE', new Date().toISOString());
      processedQueue = [];
      socket.emit('get market manifest');
    };

    const itemRoutine = async () => {
      let idx = chooseRandomItem(itemQueue, routineCount);
      let it = itemQueue.splice(idx, 1)[0];
      socket.emit('get player marketplace items', it);
      if (itemQueue.length > 0) {
        setTimeout(
          itemRoutine,
          ITEM_ROUTINE_TIMEOUT + Math.floor(Math.random() * ITEM_RAND_TIMEOUT) - ITEM_RAND_TIMEOUT
        );
      } else {
        try {
          await updatesSheetItems(
            processedQueue.sort(
              (a, b) => parseInt(a.id.toString(), 10) - parseInt(b.id.toString(), 10)
            )
          );
          resolve();
        } catch (e) {
          reject(e);
        }
      }
    };

    console.log('STARTING CLIENT');
    setTimeout(() => marketRoutine(), 3000);
    setTimeout(() => {
      reject();
    }, ROUTINE_TIMEOUT);
  });
};

export default marketCronHandler;
