import Axios from 'axios';

const parseCurrency = (val: string) => parseFloat(val.replace('$', '').replace(',', ''));

export const marketSnapshot = async () => {
  console.log('Called market snapshot');
  let res = await Axios.get('https://sheet.best/api/sheets/55c12439-b6db-4e86-a59f-727412218a8a');
  const mapped = res.data.map((it: any) => ({
    id: it.ID,
    name: it.Name,
    minPrice: parseCurrency(it['Min Price']),
    maxPrice: parseCurrency(it['Max Price']),
    medianPrice: parseCurrency(it['Median Price']),
    sumPrice: parseCurrency(it['Sum Price']),
    averagePrice: parseCurrency(it['Average Price']),
    relativeMinPrice: parseCurrency(it['Relative Min Price']),
    volume: it.Volume,
    routineAt: it['Routine At'],
    lastUpdatedAt: it['Last Updated At'],
  }));
  return mapped;
};
