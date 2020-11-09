import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ItemDetail } from '../../../pages/api/market-prices/[itemID]';
import formatDate from 'date-fns/format';
import { formatNumber } from '@app/util/formatters/number';

export interface PriceHistoryChartProps {
  items: ItemDetail[];
}

const nameDict: any = {
  minPrice: 'Min Price',
  relativeMinPrice5: 'Mean Min Price First 5',
  relativeMinPrice10: 'Mean Min Price First 10',
  meanPrice: 'Mean Price',
  medianPrice: 'Median Price',
  volume: 'Volume',
  offerCount: 'Offers',
};

export const PriceHistoryChart = ({ items }: PriceHistoryChartProps) => {
  console.log(items);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={items}>
        <Line type="basis" dataKey="minPrice" stroke="#003f5c" />
        <Line type="basis" dataKey="relativeMinPrice5" stroke="#374c80" />
        <Line type="basis" dataKey="relativeMinPrice10" stroke="#7a5195" />
        <Line type="basis" dataKey="meanPrice" stroke="#bc5090" />
        <Line type="basis" dataKey="medianPrice" stroke="#ef5675" />
        <Line type="basis" dataKey="offerCount" stroke="#ffa600" />
        <Bar dataKey="volume" fill="#ff764a" yAxisId={1} />
        <CartesianGrid stroke="#DDD" />
        <YAxis dataKey="minPrice" />
        <XAxis
          dataKey="routineAtTime"
          scale="time"
          tickFormatter={time => formatDate(new Date(time), 'HH:mm - MM/dd')}
        />
        <YAxis dataKey="volume" orientation="right" yAxisId={1} />
        <Tooltip
          labelFormatter={time => formatDate(new Date(time), 'HH:mm - MM/dd')}
          formatter={(val, name) => [formatNumber(val as number, 0, 0), nameDict[name]]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
