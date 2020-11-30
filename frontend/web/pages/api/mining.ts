import { NextApiRequest, NextApiResponse } from 'next';
import { miningIds, miningItems } from '@app/lib/game/item-mining';
import { miningLocations, MiningLocation } from '@app/lib/game/location-mining';
import { connectToDatabase } from 'web/src/server/mongodb';

export interface MarketPricesItemDetail {
  id: string;
  name: string;
  minPrice: number;
  volume: number;
  offerCount: number;
  routineAtTime: number;
}

export interface MiningCalculatorLocationSummary {
  id: number;
  name: string;
  expDay: number;
  expHour: number;
  profitDay: number;
  profitHour: number;
  profitDayFood: number;
  profitHourFood: number;
}

export interface MiningCalculatorLocationDetail {
  id: number;
  name: string;
  chance: number;
  lootHour: number;
  lootDay: number;
  barHour?: number;
  barDay?: number;
  barHourFood?: number;
  barDayFood?: number;
  expHour: number;
  expDay: number;
  profitHour: number;
  profitDay: number;
  profitHourFood?: number;
  profitDayFood?: number;
}

export interface MiningCalculatorLocation {
  summary: MiningCalculatorLocationSummary;
  detail: MiningCalculatorLocationDetail[];
  actsHour: number;
  actsDay: number;
}

export interface MiningGetResponse {
  marketPrices: MarketPricesItemDetail[];
  latestUpdate: number;
  locations: (MiningCalculatorLocation & MiningLocation)[];
}

const marketPricesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const options = {
      skill: parseFloat((req.query.skill as string) || '70'),
      buffs: {
        destructingTesting: parseFloat((req.query.buffs_destructionTesting as string) || '0'),
        gathering: parseFloat((req.query.buffs_gathering as string) || '0'),
        haste: parseFloat((req.query.buffs_haste as string) || '0'),
        scholar: parseFloat((req.query.buffs_scholar as string) || '0'),
        superHeated: parseFloat((req.query.buffs_superHeated as string) || '0'),
      },
      food: {
        gathering: parseFloat((req.query.food_gathering as string) || '0'),
        gatherginStacks: parseFloat((req.query.food_gathering_stacks as string) || '1'),
        superHeated: parseFloat((req.query.food_superHeated as string) || '0'),
        superHeatedStacks: parseFloat((req.query.food_superHeated_stacks as string) || '1'),
      },
      foodIngredients: {
        gathering: (req.query.food_ingredients_gathering as string[]) || [],
        superHeated: (req.query.food_ingredients_superHeated as string[]) || [],
      },
    };
    // console.log('MINING OPTIONS', options);

    const db = await connectToDatabase();
    const ms = db.collection('market-snapshot');
    const mp = await ms.find({ itemID: { $in: miningIds } }).toArray();

    const latestUpdate = mp[0].routineAtTime;

    const items = mp.reduce((acc: any, it) => ({ ...acc, [it.itemID]: it }), {});

    const locations = miningLocations.map(location => {
      const time =
        location.time / ((100 + options.skill - 1) / (100 * 1 * (1 - options.buffs.haste))) / 1000;
      const actsHour = 3600 / time;
      const actsDay = (3600 * 24) / time;
      const detail: MiningCalculatorLocationDetail[] = location.loot.map(it => {
        const chance = location.lootChance[it] * (1 + options.buffs.gathering);
        const lootHour = actsHour * chance;
        const lootDay = actsDay * chance;
        const hasBar = miningItems[it].barId != null && options.buffs.superHeated > 0.0;
        const barHour = hasBar ? lootHour * options.buffs.superHeated : undefined;
        const barDay = hasBar ? lootHour * options.buffs.superHeated : undefined;
        const barHourFood = barHour != null ? barHour * (1 + options.food.superHeated) : undefined;
        const barDayFood = barDay != null ? barDay * (1 + options.food.superHeated) : undefined;
        const minPrice = miningItems[it].barId != null ? items[miningItems[it].barId!].minPrice : 0;
        const profitHour =
          (options.buffs.scholar > 0 ? 0 : 1) * lootHour * items[it].minPrice +
          (barHour != null ? barHour * minPrice : 0);
        const profitDay =
          (options.buffs.scholar > 0 ? 0 : 1) * lootDay * items[it].minPrice +
          (barDay != null ? barDay * minPrice : 0);
        let profitHourFood;
        let profitDayFood;
        if (
          (options.food.gathering > 0 && options.foodIngredients.gathering.length > 0) ||
          (options.food.superHeated > 0 && options.foodIngredients.superHeated.length > 0)
        ) {
          const gatheringPrice = options.foodIngredients.gathering.reduce(
            (acc, it) => acc + (mp.find(item => item.id === it)?.minPrice || 0),
            0
          );
          const superHeatedPrice = options.foodIngredients.superHeated.reduce(
            (acc, it) => acc + (mp.find(item => item.id === it)?.minPrice || 0),
            0
          );
          const gatheringPerStack = gatheringPrice / options.food.gatherginStacks;
          const superHeatedPerStack = superHeatedPrice / options.food.superHeatedStacks;
          profitHourFood =
            lootHour * items[it].minPrice +
            (barHourFood != null ? barHourFood * minPrice : 0) +
            lootHour * options.food.gathering * minPrice -
            lootHour * gatheringPerStack -
            lootHour * superHeatedPerStack;
          profitDayFood =
            lootDay * items[it].minPrice +
            (barDayFood != null ? barDayFood * minPrice : 0) +
            lootDay * options.food.gathering * minPrice -
            lootDay * gatheringPerStack -
            lootDay * superHeatedPerStack;
        }
        return {
          id: it,
          name: miningItems[it].name,
          chance,
          lootHour,
          lootDay,
          barHour,
          barDay,
          barHourFood,
          barDayFood,
          expHour: lootHour * miningItems[it].experience,
          expDay: lootDay * miningItems[it].experience,
          profitHour,
          profitDay,
          profitHourFood,
          profitDayFood,
        };
      });
      const summary = detail.reduce(
        (acc, it) => ({
          expDay: acc.expDay + it.expDay,
          expHour: acc.expHour + it.expHour,
          profitDay: acc.profitDay + it.profitDay,
          profitHour: acc.profitHour + it.profitHour,
          profitDayFood: acc.profitDayFood + (it.profitDayFood || it.profitDay),
          profitHourFood: acc.profitHourFood + (it.profitHourFood || it.profitHour),
        }),
        { expHour: 0, expDay: 0, profitHour: 0, profitDay: 0, profitHourFood: 0, profitDayFood: 0 }
      );
      return {
        ...location,
        time,
        actsHour,
        actsDay,
        summary,
        detail,
      };
    });

    res.json({ marketPrices: mp, latestUpdate, locations });
  } else {
    res.status(405);
  }
};

export default marketPricesHandler;
