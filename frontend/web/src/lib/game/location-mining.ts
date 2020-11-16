export interface MiningLocation {
  id: number;
  name: string;
  level: number;
  time: number;
  itemImage: string;
  loot: number[];
  lootChance: { [key: number]: number };
  hasDangerousEncounters?: boolean;
}

export const miningLocations: MiningLocation[] = [
  {
    id: 10,
    name: 'Clay Pit',
    level: 1,
    time: 5e3,
    itemImage: '/images/mining/Place-ClayPits.png',
    loot: [108, 101, 102, 109, 110],
    lootChance: {
      108: 0.4,
      101: 0.2,
      102: 0.2,
      109: 0.1,
      110: 0.1,
    },
  },
  {
    id: 11,
    name: 'City Outskirts',
    level: 10,
    time: 8e3,
    itemImage: '/images/mining/Place-CityOutskirts.png',
    loot: [101, 102, 108, 109, 110, 103, 112],
    lootChance: {
      101: 0.3,
      102: 0.3,
      103: 0.05,
      108: 0.1,
      109: 0.1,
      110: 0.1,
      112: 0.05,
    },
  },
  {
    id: 14,
    name: 'Village',
    level: 20,
    time: 8e3,
    itemImage: '/images/mining/Place-Village.png',
    loot: [109, 103, 112],
    lootChance: {
      103: 0.5,
      109: 0.25,
      112: 0.25,
    },
  },
  {
    id: 15,
    name: 'Desert',
    level: 30,
    time: 12e3,
    itemImage: '/images/mining/Place-Desert.png',
    loot: [110, 105, 111, 112, 2013, 113, 103, 104, 108],
    lootChance: {
      103: 9 / 106,
      104: 5 / 106,
      105: 20 / 106,
      108: 3 / 106,
      110: 20 / 106,
      111: 20 / 106,
      112: 10 / 106,
      113: 9 / 106,
      2013: 10 / 106,
    },
  },
  {
    id: 17,
    name: 'Underground',
    level: 40,
    time: 12e3,
    itemImage: '/images/mining/Place-Underground.png',
    loot: [104, 105, 111, 113, 2013, 109, 103, 112],
    lootChance: {
      103: 0.05,
      104: 0.25,
      105: 0.2,
      109: 0.05,
      111: 0.15,
      112: 0.05,
      113: 0.15,
      2013: 0.1,
    },
  },
  {
    id: 19,
    name: 'Hidden Mine',
    level: 50,
    time: 15e3,
    itemImage: '/images/mining/Place-HiddenLocation.png',
    loot: [106, 111, 109, 104, 105, 107, 113],
    lootChance: {
      104: 0.1,
      105: 0.1,
      106: 0.35,
      107: 0.1,
      109: 0.1,
      111: 0.15,
      113: 0.1,
    },
  },
  {
    id: 13,
    name: 'Volcano',
    level: 60,
    time: 15e3,
    itemImage: '/images/mining/Place-Volcano.png',
    loot: [111, 105, 106, 107, 113, 104],
    lootChance: {
      104: 0.1,
      105: 0.1,
      106: 0.2,
      107: 0.2,
      111: 0.2,
      113: 0.1,
    },
  },
  {
    id: 20,
    name: 'Deep Pit',
    level: 70,
    time: 2e4,
    hasDangerousEncounters: true,
    itemImage: '/images/mining/Place-DeepMine.png',
    loot: [107, 113, 104, 114],
    lootChance: {
      104: 25 / 110,
      107: 50 / 110,
      113: 25 / 110,
      114: 10 / 110,
    },
  },
];
