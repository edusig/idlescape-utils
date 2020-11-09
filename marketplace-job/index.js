// TODO: Remove price outliers by looking at the diff (in orders of magnitude) between the offered price and the median.

const io = require('socket.io-client');
const axios = require('axios');

// Sheet.Best Configs
const sbApi = '***REMOVED***';
const sbApiKey = '***REMOVED***';
const reqOps = { headers: { 'Content-Type': 'application/json', 'X-Api-Key': sbApiKey } };

// Socket.io initialization
const jwt =
  '***REMOVED***';
const socket = io('wss://idlescape.com', { query: { token: `Bearer ${jwt}` } });

// Constants
// Every minute check if its a 30min interval (0 or 30)
MARKET_ROUTINE_TIMEOUT = 60000;
// Every 2secs (+/- 500ms)
ITEM_ROUTINE_TIMEOUT = 1500;
ITEM_RAND_TIMEOUT = 500;

// Shared values
let itemQueue = [];
let processedQueue = [];
let routineTime;
let routineCount = 0;

// Socket message handlers
socket.on('pong', data => socket.emit('latency', data));

socket.on('get market manifest', data => {
  routineTime = new Date();
  routineCount = data.length;
  console.log('Updating market,', routineCount, 'items found.');
  updateItems(data);
  itemRoutine();
});

socket.on('get player marketplace items', data => {
  const body = processItemData(data);
  if(body != null) {
    processedQueue.push(body);
  }
});

// Utilitary functions
const updateItems = newItems => {
  itemQueue = newItems.slice(0).map(it => it.itemID);
  return itemQueue;
};

const chooseRandomItem = items => {
  console.log(
    'Picking item',
    routineCount - (items.length - 1),
    'of',
    routineCount,
    `(${(((routineCount - (items.length - 1)) / routineCount) * 100).toFixed(2)}%) -`
  );
  const idx = Math.floor(Math.random() * (items.length - 1));
  const item = items.splice(idx, 1);
  return item;
};

const getRelativeMin = (data) => Math.floor(data.reduce((acc, it) => acc + it.price * it.stackSize, 0) /
    data.reduce((acc, it) => acc + it.stackSize, 0));
const getPercent = (data, percent) => {
  const pct = Math.ceil(data.length * percent);
  return pct >= 1 ? pct : 1;
}

const processItemData = data => {
  if(data.length <= 0) {
    return null;
  }
  const middle = Math.floor((data.length - 1) / 2);
  const medianData = data[!isNaN(middle) && middle >= 0 ? middle : 0];
  const median = medianData != null && medianData.hasOwnProperty('price') ? medianData.price : data[0].price
  // Removes outliers (Price > 1 Billion or 100x greater than the median)
  const filtered = data.filter(it => it.price <= 1000000000 && it.price <= median * 100, )
  const sum = filtered.reduce((acc, it) => acc + it.price, 0);
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
      volume: filtered.reduce((acc, it) => acc + it.stackSize, 0),
      offerCount: data.length,
      relativeMinPriceFirst5: getRelativeMin(filtered.slice(0,5)),
      relativeMinPriceFirst10: getRelativeMin(filtered.slice(0, 10)),
      relativeMinPriceFirst5Pct: getRelativeMin(filtered.slice(0, getPercent(0.05))),
      relativeMinPriceFirst10Pct: getRelativeMin(filtered.slice(0, getPercent(0.1))),
      relativeMinPriceFirst15Pct: getRelativeMin(filtered.slice(0, getPercent(0.15))),
      stdDeviation: Math.sqrt(filtered.reduce((acc, it) => acc + Math.pow(it.price - mean, 2), 0) / filtered.length),
      routineAt: routineTime.toISOString(),
      updatedAt: new Date().toISOString(),
      updatedAtTime: new Date().getTime(),
    })
  };
};

const updatesSheetItems = async queue => {
  try {
    console.log('ABOUT TO WRITE TO THE SPREADSHEET', new Date());
    await axios.delete(`${sbApi}/0:400`);
    await axios.post(`${sbApi}`, queue, reqOps);
    await axios.post(`${sbApi}/tabs/market-history`, queue, reqOps);
    console.log('SPREADSHEET UPDATED', new Date());
  } catch (e) {
    console.log('Errored at:', new Date().toISOString());
    console.error(e);
  }
};

const itemCheck = id => socket.emit('get player marketplace items', id);

// Main routines
const marketRoutine = () => {
  const now = new Date();
  if([0, 30].includes(now.getMinutes())) {
    console.log('ITS TIME TO UPDATE', now.toISOString());
    itemQueue = [];
    processedQueue = [];
    socket.emit('get market manifest');
  }
  setTimeout(marketRoutine, MARKET_ROUTINE_TIMEOUT);
};

const itemRoutine = () => {
  let it = chooseRandomItem(itemQueue);
  itemCheck(it);
  if (itemQueue.length > 0) {
    setTimeout(
      itemRoutine,
      ITEM_ROUTINE_TIMEOUT + Math.floor(Math.random() * ITEM_RAND_TIMEOUT) - ITEM_RAND_TIMEOUT
    );
  } else {
    updatesSheetItems(
      processedQueue.sort((a, b) => parseInt(a.id.toString(), 10) - parseInt(b.id.toString(), 10))
    );
  }
};

console.log('STARTING CLIENT');
setTimeout(() => marketRoutine(), 5000);
