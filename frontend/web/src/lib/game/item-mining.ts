export interface MiningItem {
  id: number;
  name: string;
  experience: number;
  itemImage: string;
  barId?: number;
}

export const miningItems: { [key: number]: MiningItem } = {
  101: {
    id: 101,
    name: 'Copper Ore',
    experience: 5,
    itemImage: '/images/mining/copper_ore.png',
    barId: 201,
  },
  102: {
    id: 102,
    name: 'Tin Ore',
    experience: 5,
    itemImage: '/images/mining/tin_ore.png',
    barId: 201,
  },
  103: {
    id: 103,
    name: 'Iron Ore',
    experience: 15,
    itemImage: '/images/mining/iron_ore.png',
    barId: 202,
  },
  104: {
    id: 104,
    name: 'Gold Ore',
    experience: 25,
    itemImage: '/images/mining/gold_ore.png',
    barId: 203,
  },
  105: {
    id: 105,
    name: 'Mithril Ore',
    experience: 50,
    itemImage: '/images/mining/mithril_ore.png',
    barId: 204,
  },
  106: {
    id: 106,
    name: 'Adamantite Ore',
    experience: 75,
    itemImage: '/images/mining/adamantite_ore.png',
    barId: 205,
  },
  107: {
    id: 107,
    name: 'Runite Ore',
    experience: 100,
    itemImage: '/images/mining/runite_ore.png',
    barId: 206,
  },
  108: {
    id: 108,
    name: 'Clay',
    experience: 1,
    itemImage: '/images/mining/clay.png',
  },
  109: {
    id: 109,
    name: 'Stone',
    experience: 1,
    itemImage: '/images/mining/stone.png',
  },
  110: {
    id: 110,
    name: 'Sand',
    experience: 1,
    itemImage: '/images/mining/sand.png',
  },
  111: {
    id: 111,
    name: 'Silver',
    experience: 25,
    itemImage: '/images/mining/silver.png',
  },
  112: {
    id: 112,
    name: 'Coal',
    experience: 10,
    itemImage: '/images/mining/coal.png',
  },
  113: {
    id: 113,
    name: 'Rune Slate',
    experience: 10,
    itemImage: '/images/runecrafting/rune_slate.png',
  },
  114: {
    id: 114,
    name: 'Stygian Ore',
    experience: 150,
    itemImage: '/images/mining/stygian_ore.png',
    barId: 207,
  },
  201: {
    id: 201,
    name: 'Bronze Bar',
    experience: 10,
    itemImage: '/images/smithing/bronze_bar.png',
  },
  202: {
    id: 202,
    name: 'Iron Bar',
    experience: 100,
    itemImage: '/images/smithing/iron_bar.png',
  },
  203: {
    id: 203,
    name: 'Gold Bar',
    experience: 100,
    itemImage: '/images/smithing/gold_bar.png',
  },
  204: {
    id: 204,
    name: 'Mithril Bar',
    experience: 200,
    itemImage: '/images/smithing/mithril_bar.png',
  },
  205: {
    id: 205,
    name: 'Adamantite Bar',
    experience: 300,
    itemImage: '/images/smithing/adamantite_bar.png',
  },
  206: {
    id: 206,
    name: 'Runite Bar',
    experience: 1e3,
    itemImage: '/images/smithing/runite_bar.png',
  },
  207: {
    id: 207,
    name: 'Stygian Bar',
    experience: 1500,
    itemImage: '/images/smithing/stygian_bar.png',
  },
  2013: {
    name: 'Salt',
    id: 2013,
    experience: 10,
    itemImage: '/images/cooking/salt.png',
  },
};
