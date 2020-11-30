import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import formatDate from 'date-fns/format';
import { formatBigNumber, formatNumber } from '@app/util/formatters/number';
import { useState } from 'react';
import { ItemDetail } from 'web/src/server/interfaces';

export interface PriceHistoryChartProps {
  items: ItemDetail[];
}

const nameDict: any = {
  minPrice: 'Min Price',
  relativeMinPriceFirst5: 'MMP 5',
  relativeMinPriceFirst10: 'MMP 10',
  meanPrice: 'Mean Price',
  medianPrice: 'Median Price',
  volume: 'Volume',
  offerCount: 'Offers',
};

export const PriceHistoryChart = ({ items }: PriceHistoryChartProps) => {
  const [hide, setHide] = useState<any>({
    minPrice: false,
    relativeMinPriceFirst5: true,
    relativeMinPriceFirst10: true,
    meanPrice: false,
    medianPrice: false,
    volume: false,
    offerCount: false,
  });
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={items}>
        <Area
          type="monotone"
          dataKey="offerCount"
          stroke="#ffa600"
          yAxisId={2}
          hide={hide.offerCount}
        />
        <Bar dataKey="volume" hide={hide.volume} fill="#ff764a" yAxisId={1} height={200} />
        <Line type="monotone" dataKey="minPrice" hide={hide.minPrice} stroke="#003f5c" />
        <Line
          type="monotone"
          dataKey="relativeMinPriceFirst5"
          hide={hide.relativeMinPriceFirst5}
          stroke="#374c80"
        />
        <Line
          type="monotone"
          dataKey="relativeMinPriceFirst10"
          hide={hide.relativeMinPriceFirst10}
          stroke="#7a5195"
        />
        <Line type="monotone" dataKey="meanPrice" hide={hide.meanPrice} stroke="#bc5090" />
        <Line type="monotone" dataKey="medianPrice" hide={hide.medianPrice} stroke="#ef5675" />
        <CartesianGrid stroke="#DDD" />
        <XAxis
          dataKey="routineAtTime"
          scale="time"
          tickFormatter={time => formatDate(new Date(time), 'HH:mm - MM/dd')}
          padding={{ left: 0, right: 10 }}
        />
        <YAxis tickFormatter={val => formatBigNumber(val, 2, 0)} width={50} />
        <YAxis
          dataKey="volume"
          tickFormatter={val => formatBigNumber(val, 2, 0)}
          orientation="right"
          yAxisId={1}
          padding={{ top: 300, bottom: 0 }}
          width={50}
        />
        <YAxis
          dataKey="offerCount"
          orientation="right"
          yAxisId={2}
          hide
          padding={{ top: 300, bottom: 0 }}
        />
        <Tooltip
          labelFormatter={time => formatDate(new Date(time), 'HH:mm - MM/dd')}
          formatter={(val, name) => [formatNumber(val as number, 0, 0), nameDict[name]]}
        />
        <Legend
          verticalAlign="top"
          height={30}
          onClick={dataSet =>
            setHide((prev: any) => ({ ...prev, [dataSet.dataKey]: !prev[dataSet.dataKey] }))
          }
          formatter={val => nameDict[val]}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
