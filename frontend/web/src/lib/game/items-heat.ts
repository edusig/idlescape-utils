export interface ItemHeatDetail {
  name: string;
  id: number;
  heat?: number;
  itemImage: string;
}

export const ItemsHeat: { [key: number]: ItemHeatDetail } = {
  50: {
    name: 'Book',
    id: 50,
    heat: 50,
    itemImage: '/images/misc/book.png',
  },
  112: {
    id: 112,
    name: 'Coal',
    heat: 10,
    itemImage: '/images/mining/coal.png',
  },
  301: {
    id: 301,
    name: 'Branch',
    heat: 1,
    itemImage: '/images/foraging/branch.png',
  },
  302: {
    id: 302,
    name: 'Log',
    heat: 5,
    itemImage: '/images/foraging/log.png',
  },
  303: {
    id: 303,
    name: 'Oak Log',
    heat: 10,
    itemImage: '/images/foraging/oak_log.png',
  },
  304: {
    id: 304,
    name: 'Willow Log',
    heat: 20,
    itemImage: '/images/foraging/willow_log.png',
  },
  305: {
    id: 305,
    name: 'Maple Log',
    heat: 70,
    itemImage: '/images/foraging/maple_log.png',
  },
  306: {
    id: 306,
    name: 'Yew Log',
    heat: 200,
    itemImage: '/images/foraging/yew_log.png',
  },
  702: {
    id: 702,
    name: 'Pyre Log',
    heat: 100,
    itemImage: '/images/foraging/pyre.png',
  },
  703: {
    id: 703,
    name: 'Pyre Oak Log',
    heat: 200,
    itemImage: '/images/foraging/oak_pyre.png',
  },
  704: {
    id: 704,
    name: 'Pyre Willow Log',
    heat: 400,
    itemImage: '/images/foraging/willow_pyre.png',
  },
  705: {
    id: 705,
    name: 'Pyre Maple Log',
    heat: 800,
    itemImage: '/images/foraging/maple_pyre.png',
  },
  706: {
    id: 706,
    name: 'Pyre Yew Log',
    heat: 3e3,
    itemImage: '/images/foraging/yew_pyre.png',
  },
};
