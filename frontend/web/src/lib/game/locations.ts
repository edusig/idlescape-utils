export const locations = {
  10: {
    name: 'city1',
    id: 10,
    mining: {
      name: 'Clay Pit',
      level: 1,
      time: 5e3,
      skill: 'mining',
      activeMessage: 'Mining in the clay pit',
      itemImage: '/images/mining/Place-ClayPits.png',
      imageIsBackground: !0,
      loot: [108, 101, 102, 109, 110],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  11: {
    name: 'city2',
    id: 11,
    mining: {
      name: 'City Outskirts',
      level: 10,
      time: 8e3,
      skill: 'mining',
      activeMessage: 'Mining in the city outskirts',
      itemImage: '/images/mining/Place-CityOutskirts.png',
      imageIsBackground: !0,
      loot: [101, 102, 108, 109, 110, 103, 112],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  12: {
    name: 'Grasslands',
    id: 12,
    foraging: {
      name: 'Grasslands',
      level: 1,
      time: 6e3,
      skill: 'foraging',
      itemImage: '/images/foraging/grasslands.png',
      imageIsBackground: !0,
      loot: [151, 2016, 2021, 2023, 155, 2027, 158, 301, 302],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  13: {
    name: 'Volcano',
    id: 13,
    mining: {
      name: 'Volcano',
      level: 60,
      time: 15e3,
      skill: 'mining',
      activeMessage: 'Mining in a volcano',
      itemImage: '/images/mining/Place-Volcano.png',
      imageIsBackground: !0,
      loot: [111, 105, 106, 107, 113, 104],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  14: {
    name: 'Village',
    id: 14,
    mining: {
      name: 'Village',
      level: 20,
      time: 8e3,
      skill: 'mining',
      activeMessage: 'Mining near a small village',
      itemImage: '/images/mining/Place-Village.png',
      imageIsBackground: !0,
      loot: [109, 103, 112],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  15: {
    name: 'Desert',
    id: 15,
    mining: {
      name: 'Desert',
      level: 30,
      time: 12e3,
      skill: 'mining',
      activeMessage: 'Mining out in the desert',
      itemImage: '/images/mining/Place-Desert.png',
      imageIsBackground: !0,
      loot: [110, 105, 111, 112, 2013, 113, 103, 104, 108],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  16: {
    name: 'The Tangle',
    id: 16,
    foraging: {
      name: 'The Tangle',
      level: 30,
      time: 12e3,
      skill: 'foraging',
      itemImage: '/images/foraging/the_tangle.png',
      imageIsBackground: !0,
      loot: [2022, 159, 2026, 175, 2028, 176, 153, 301, 302, 303, 304, 305],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  17: {
    name: 'Underground',
    id: 17,
    mining: {
      name: 'Underground',
      level: 40,
      time: 12e3,
      skill: 'mining',
      activeMessage: 'Mining underground',
      itemImage: '/images/mining/Place-Underground.png',
      imageIsBackground: !0,
      loot: [104, 105, 111, 113, 2013, 109, 103, 112],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  18: {
    name: 'Tundra',
    id: 18,
    foraging: {
      name: 'Frozen Tundra',
      level: 50,
      time: 15e3,
      skill: 'foraging',
      itemImage: '/images/foraging/frozen_tundra.png',
      imageIsBackground: !0,
      loot: [2022, 159, 2027, 158, 2029, 154, 152, 301, 173, 305],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  19: {
    name: 'Hidden Location Name Placeholder',
    id: 19,
    mining: {
      name: 'Hidden Mine',
      level: 50,
      time: 15e3,
      skill: 'mining',
      activeMessage: 'Mining in a secret spot',
      itemImage: '/images/mining/Place-HiddenLocation.png',
      imageIsBackground: !0,
      loot: [106, 111, 109, 104, 105, 107, 113],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  20: {
    name: 'The Deep Pit',
    id: 20,
    mining: {
      name: 'Deep Pit',
      level: 70,
      time: 2e4,
      skill: 'mining',
      hasDangerousEncounters: !0,
      lockout: {
        skill: 'mining',
        name: 'deepPit',
        duration: 15,
        trigger: 'death',
        message: 'The demons bar your passage.',
      },
      activeMessage: 'Mining further than you should',
      itemImage: '/images/mining/Place-DeepMine.png',
      extraTooltipInfo: 'Warning: This mining location is dangerous.',
      imageIsBackground: !0,
      loot: [107, 113, 104, 114],
      skillIcon: 'images/mining/iron_pickaxe.png',
      actionButton: 'Mine',
    },
  },
  21: {
    name: 'Verdant Valley',
    id: 21,
    foraging: {
      name: 'Verdant Valley',
      level: 10,
      time: 8e3,
      skill: 'foraging',
      itemImage: '/images/foraging/verdant_valley.png',
      imageIsBackground: !0,
      loot: [2016, 2021, 151, 2025, 157, 2029, 154, 170, 301, 302, 303],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  22: {
    name: 'Fungal Grotto',
    id: 22,
    foraging: {
      name: 'Fungal Grotto',
      level: 20,
      time: 8e3,
      skill: 'foraging',
      itemImage: '/images/foraging/fungal_grotto.png',
      imageIsBackground: !0,
      loot: [2020, 161, 2023, 155, 2021, 151, 301, 170, 171, 172, 175, 176],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  23: {
    name: 'Eroded Cavern',
    id: 23,
  },
  24: {
    name: 'Misty Marsh',
    id: 24,
    foraging: {
      name: 'Misty Marsh',
      level: 40,
      time: 12e3,
      skill: 'foraging',
      itemImage: '/images/foraging/misty_marsh.png',
      imageIsBackground: !0,
      loot: [2023, 155, 2024, 160, 2030, 156, 153, 171, 172, 301, 303, 304],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  25: {
    name: 'Haunted Wood',
    id: 25,
    foraging: {
      name: 'Haunted Woods',
      level: 60,
      time: 15e3,
      skill: 'foraging',
      itemImage: '/images/foraging/haunted_woods.png',
      imageIsBackground: !0,
      loot: [2020, 161, 2024, 160, 152, 172, 173, 174, 301, 304, 305, 306],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  26: {
    name: 'Living Forest',
    id: 26,
    foraging: {
      name: 'Living Forest',
      level: 70,
      time: 2e4,
      skill: 'foraging',
      hasDangerousEncounters: !0,
      lockout: {
        skill: 'foraging',
        name: 'livingForest',
        duration: 15,
        trigger: 'death',
        message: 'The forest vines grow in front of you, preventing entry.',
      },
      itemImage: '/images/foraging/living_forest.png',
      extraTooltipInfo: 'Warning: This foraging location is dangerous.',
      imageIsBackground: !0,
      loot: [2016, 2025, 157, 2026, 175, 2028, 176, 174, 302, 303, 304, 305, 306, 177],
      skillIcon: 'images/foraging/foraging_icon.png',
      actionButton: 'Forage',
    },
  },
  27: {
    name: 'Valley of Giants',
    id: 27,
  },
  50: {
    name: 'PLACEHOLDERFORFISHING',
    id: 50,
    fishing: {
      name: 'Net fishing',
      tool: 'net',
      level: 1,
      time: 1e4,
      skill: 'fishing',
      itemImage: '/images/fishing/net_fishing.jpg',
      imageIsBackground: !0,
      loot: [60, 61],
      requiredResources: {
        690: 1,
      },
      class: 'none',
      skillIcon: 'images/fishing/fishing_logo.png',
      actionButton: 'Fish',
    },
  },
  51: {
    name: 'PLACEHOLDERFORFISHING',
    id: 51,
    fishing: {
      name: 'Fly fishing',
      id: 101,
      level: 20,
      time: 1e4,
      skill: 'fishing',
      itemImage: '/images/fishing/fly_fishing.jpg',
      imageIsBackground: !0,
      loot: [62, 63],
      requiredResources: {
        691: 1,
        700: 1,
      },
      class: 'none',
      skillIcon: 'images/fishing/fishing_logo.png',
      actionButton: 'Fish',
    },
  },
  52: {
    name: 'PLACEHOLDERFORFISHING',
    id: 52,
    fishing: {
      name: 'Cage fishing',
      id: 102,
      level: 40,
      time: 1e4,
      skill: 'fishing',
      itemImage: '/images/fishing/cage_fishing.jpg',
      imageIsBackground: !0,
      loot: [64],
      requiredResources: {
        692: 1,
      },
      class: 'none',
      skillIcon: 'images/fishing/fishing_logo.png',
      actionButton: 'Fish',
    },
  },
  53: {
    name: 'PLACEHOLDERFORFISHING',
    id: 53,
    fishing: {
      name: 'Harpoon fishing',
      id: 103,
      level: 50,
      time: 1e4,
      skill: 'fishing',
      itemImage: '/images/fishing/harpoon_fishing.jpg',
      imageIsBackground: !0,
      loot: [65, 66],
      requiredResources: {
        693: 1,
      },
      class: 'none',
      skillIcon: 'images/fishing/fishing_logo.png',
      actionButton: 'Fish',
    },
  },
  400: {
    id: 400,
    smithing: {
      name: 'Bronze bar',
      activeMessage: 'Smelting bronze bars',
      skill: 'smithing',
      level: 1,
      requiredResources: {
        101: 1,
        102: 1,
        2: 1,
      },
      value: 25,
      experience: 10,
      time: 6e3,
      loot: [201],
      tradeable: !0,
      itemImage: '/images/smithing/bronze_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  401: {
    id: 401,
    smithing: {
      name: 'Iron bar',
      activeMessage: 'Smelting iron bars',
      skill: 'smithing',
      level: 15,
      requiredResources: {
        103: 3,
        2: 5,
      },
      value: 100,
      experience: 100,
      time: 12e3,
      loot: [202],
      tradeable: !0,
      itemImage: '/images/smithing/iron_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  402: {
    id: 402,
    smithing: {
      name: 'Gold bar',
      activeMessage: 'Smelting gold bars',
      skill: 'smithing',
      level: 30,
      requiredResources: {
        104: 10,
        2: 20,
      },
      value: 1500,
      experience: 100,
      time: 2e4,
      loot: [203],
      tradeable: !0,
      itemImage: '/images/smithing/gold_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  403: {
    id: 403,
    smithing: {
      name: 'Mithril bar',
      activeMessage: 'Smelting mithril bars',
      skill: 'smithing',
      level: 50,
      requiredResources: {
        105: 5,
        2: 50,
      },
      value: 500,
      experience: 200,
      time: 3e4,
      loot: [204],
      tradeable: !0,
      itemImage: '/images/smithing/mithril_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  404: {
    id: 404,
    smithing: {
      name: 'Adamantite bar',
      activeMessage: 'Smelting adamantite bars',
      skill: 'smithing',
      level: 60,
      requiredResources: {
        106: 10,
        2: 100,
      },
      value: 3e3,
      experience: 300,
      time: 44e3,
      loot: [205],
      tradeable: !0,
      itemImage: '/images/smithing/adamantite_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  405: {
    id: 405,
    smithing: {
      name: 'Runite bar',
      activeMessage: 'Smelting runite bars',
      skill: 'smithing',
      level: 85,
      requiredResources: {
        107: 15,
        2: 200,
      },
      value: 9e3,
      experience: 1e3,
      time: 9e4,
      loot: [206],
      tradeable: !0,
      itemImage: '/images/smithing/runite_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
  406: {
    id: 406,
    smithing: {
      name: 'Stygian bar',
      activeMessage: 'Smelting stygian bars',
      skill: 'smithing',
      level: 90,
      requiredResources: {
        114: 25,
        800: 10,
        2: 500,
      },
      value: 12e3,
      experience: 1500,
      time: 106e3,
      loot: [207],
      tradeable: !0,
      itemImage: '/images/smithing/stygian_bar.png',
      class: 'bar',
      extraTooltipInfo: 'Used as a crafting material.',
      skillIcon: 'images/smithing/smithing_icon.png',
      actionButton: 'Smelt',
    },
  },
};
