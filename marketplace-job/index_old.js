// TODO: Remove price outliers by looking at the diff (in orders of magnitude) between the offered price and the median.

const io = require('socket.io-client');
const axios = require('axios');

// Sheet.Best Configs
const sbApi = 'https://sheet.best/api/sheets/55c12439-b6db-4e86-a59f-727412218a8a';
const reqOps = { headers: { 'Content-Type': 'application/json' } };

// Socket.io initialization
const jwt =
  '***REMOVED***';
const socket = io('wss://idlescape.com', { query: { token: `Bearer ${jwt}` } });

// Constants
// Every 60min update market prices
MARKET_ROUTINE_TIMEOUT = 60 * 60 * 1000;
// Every 2secs (+/- 1sec)
ITEM_ROUTINE_TIMEOUT = 2000;
ITEM_RAND_TIMEOUT = 1000;

// Shared values
let itemQueue = [];
let processedQueue = [];
// let itemDict = {};
let routineTime;
let routineCount = 0;
let sheetTabDict = {
  // 101: 'copper-ore',
  // 102: 'tin-ore',
  103: 'iron-ore',
  104: 'gold-ore',
  105: 'mithril-ore',
  106: 'adamantite-ore',
  107: 'runite-ore',
  108: 'stygian-ore',
  109: 'stone',
  110: 'sand',
  111: 'silver',
  112: 'coal',
  // 113: 'rune-slate',
  202: 'iron-bar',
  203: 'gold-bar',
  204: 'mithril-bar',
  205: 'adamantite-bar',
  206: 'runite-bar',
  207: 'stygian-bar',
  // 300: 'branch',
  // 301: 'log',
  302: 'oak-log',
  303: 'willow-log',
  304: 'maple-log',
  305: 'yew-log',
  401: 'emerald',
  402: 'ruby',
  403: 'diamond',
  404: 'black-opal',
  // 510: 'air-rune',
  // 511: 'earth-rune',
  // 512: 'fire-rune',
  // 513: 'water-rune',
  // 514: 'blood-rune',
  // 515: 'death-rune',
  // 516: 'chaos-rune',
  // 517: 'nature-rune',
  // 518: 'mind-rune',
  // 519: 'cosmic-rune',
  // 601: 'iron-pickaxe',
  602: 'mithril-pickaxe',
  603: 'adamantite-pickaxe',
  604: 'runite-pickaxe',
  // 605: 'black-opal-pickaxe',
  // 611: 'iron-hatchet',
  612: 'mithril-hatchet',
  613: 'adamantite-hatchet',
  614: 'runite-hatchet',
  // 615: 'black-opal-hatchet',
  // 622: 'emerald-ring',
  // 623: 'emerald-necklace',
  // 624: 'ruby-ring',
  // 625: 'ruby-necklace',
  // 626: 'diamond-ring',
  // 627: 'diamond-necklace',
  630: 'black-opal-ring',
  631: 'black-opal-necklace',
  640: 'gold-ring',
  641: 'gold-necklace',
  // 661: 'iron-hoe',
  662: 'mithril-hoe',
  663: 'adamantite-hoe',
  664: 'runite-hoe',
  // 665: 'black-opal-hoe',
  // 800: 'ichor',
  900: 'geode',
  // 1606: 'scroll-of-pyromancy',
  // 1608: 'scroll-of-haste',
};

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
  processedQueue.push(body);
  if (Object.keys(sheetTabDict).includes(body.ID.toString())) {
    updatesSheetItemHistory(body, data);
  }
});

// Utilitary functions
const updateItems = newItems => {
  itemQueue = newItems.slice(0).map(it => it.itemID);
  // itemDict = itemQueue.reduce((acc, it, idx) => ({ ...acc, [it]: idx }), {});
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

const processItemData = data => {
  const median = data[Math.floor((data.length - 1) / 2)].price;
  // Removes outliers (Price > 1 Billion or 100x greater than the median)
  const data = data.filter(it => it.price <= 1000000000 && it.price <= median * 100, )
  const sum = data.reduce((acc, it) => acc + it.price, 0);
  const mean = sum / data.length
  return {
    ID: data[0].itemID,
    Name: data[0].name,
    'Min Price': data[0].price,
    'Max Price': data[data.length - 1].price,
    'Median Price': data[Math.floor((data.length - 1) / 2)].price,
    'Sum Price': sum,
    'Average Price': mean,
    Volume: data.reduce((acc, it) => acc + it.stackSize, 0),
    'Offers Count': data.length,
    'Relative Min Price first 5': getRelativeMin(data.slice(0,5)),
    'Relative Min Price first 10': getRelativeMin(data.slice(0, 10)),
    'Relative Min Price first 5%': getRelativeMin(data.slice(0, Math.ceil(data.length * 0.05))),
    'Relative Min Price first 10%': getRelativeMin(data.slice(0, Math.ceil(data.length * 0.1))),
    'Relative Min Price first 15%': getRelativeMin(data.slice(0, Math.ceil(data.length * 0.15))),
    'Standard Deviation': Math.sqrt(data.reduce((acc, it) => acc + Math.pow(it.price - mean, 2), 0) / data.length),
    'Routine At': routineTime.toISOString(),
    'Last Updated At': new Date().toISOString(),
  };
};
toISOString
const updatesSheetItems = async queue => {
  try {
    console.log('ABOUT TO WRITE TO THE SPREADSHEET');
    await axios.delete(`${sbApi}/0:400`);
    await axios.post(`${sbApi}`, queue, reqOps);
    console.log('SPREADSHEET UPDATED');
  } catch (e) {
    console.log('Errored at:', new Date().toISOString());
    console.error(e);
  }
};

const updatesSheetItemHistory = async (body, data) => {
  try {
    const tab = sheetTabDict[body.ID];
    console.log('Updating history for', body.Name, `(${body.ID}) at tab ${tab}`);
    await axios.post(`${sbApi}/tabs/${tab}`, { ...body, response: data }, reqOps);
  } catch (e) {
    console.log('Errored at:', new Date().toISOString());
    console.error(e);
  }
};

const itemCheck = id => socket.emit('get player marketplace items', id);

// Main routines
const marketRoutine = () => {
  itemQueue = [];
  processedQueue = [];
  socket.emit('get market manifest');
  console.log('MARKET ROUTINE DONE');
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
      processedQueue.sort((a, b) => parseInt(a.ID.toString(), 10) - parseInt(b.ID.toString(), 10))
    );
  }
};

console.log('STARTING CLIENT');
setTimeout(() => marketRoutine(), 5000);
// updatesSheetItems([
//   {
//     ID: 1000,
//     Name: 'Test',
//     'Min Price': 1,
//     'Max Price': 2,
//     'Median Price': 3,
//     'Sum Price': 4,
//     'Average Price': 5,
//     Volume: 6,
//     'Relative Min Price': 7,
//     'Routine At': new Date().toString(),
//     'Last Updated At': new Date().toString(),
//   },
// ]);
