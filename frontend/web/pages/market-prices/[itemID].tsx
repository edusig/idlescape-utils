import { AdminTitle } from '@app/components/admin-title';
import IndexLayout from '@app/components/layout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import { ItemDetail, ItemDetailGetResponse } from '../api/market-prices/[itemID]';
import formatDate from 'date-fns/format';
import { Cell, ResponsiveTable, Row, Table } from '@app/styled-components/table';
import Typography from '@app/components/typography';
import Image from 'next/image';
import { formatNumber } from '@app/util/formatters/number';
import { imageDict } from '@app/lib/game/image-dict';
import styled from 'styled-components';
import { PriceHistoryChart } from '@app/components/chart/price-history-chart';

interface MarketPricesDetailProps {
  initialItemDetail: ItemDetailGetResponse;
  itemName: string;
}

const DateCell = styled(Cell)`
  min-width: 130px;
`;

const Chart = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.87);
`;

// TODO: Pills with insights (lowest min price / highest min price / avg min price)
// TODO:
export const MarketPricesDetail = ({ initialItemDetail, itemName }: MarketPricesDetailProps) => {
  const { query } = useRouter();
  const itemID = query.itemID as string;
  const itemDetailQ = useSWR(`/api/market-prices/${itemID}`, { initialData: initialItemDetail });
  const itemHistory = useMemo(
    () =>
      (itemDetailQ.data?.history || []).map((it: ItemDetail, idx: number) => (
        <Row key={idx}>
          <DateCell>
            <Typography variant="body2">
              {formatDate(new Date(it?.routineAtTime!), 'HH:mm - MM/dd')}
            </Typography>
          </DateCell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.minPrice || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.relativeMinPriceFirst5 || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.relativeMinPriceFirst10 || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.meanPrice || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.medianPrice || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.stdDeviation || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.maxPrice || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.volume || 0, 0, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.offerCount || 0, 0, 0)}
            </Typography>
          </Cell>
        </Row>
      )),
    [itemDetailQ.data]
  );
  const lastUpdate = useMemo(
    () =>
      itemDetailQ.data?.current?.routineAtTime != null
        ? `Last update at: ${formatDate(
            new Date(itemDetailQ.data.current.routineAtTime!),
            'HH:mm - MM/dd/yy'
          )}`
        : undefined,
    [itemDetailQ.data]
  );
  return (
    <IndexLayout title={`Details of ${itemName}`}>
      <AdminTitle
        title={`Details of ${itemName}`}
        subtitle={lastUpdate}
        img={
          <Image
            src={imageDict[parseInt(itemID, 10)]}
            width={96}
            height={96}
            loading="eager"
            priority
          />
        }
      />
      {itemDetailQ.data != null && (
        <Chart>
          <PriceHistoryChart items={itemDetailQ.data.history.slice(0).reverse()} />
        </Chart>
      )}
      <Typography variant="caption" align="center">
        MMP = Mean Min Price of the first X offers
      </Typography>
      <ResponsiveTable>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <Cell>
                <Typography variant="subtitle2">Date Time</Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Min P.
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  MMP 5
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  MMP 10
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Mean P.
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Median P.
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Std. Dev.
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Max P.
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Volume
                </Typography>
              </Cell>
              <Cell>
                <Typography variant="subtitle2" align="right">
                  Offers
                </Typography>
              </Cell>
            </tr>
          </thead>
          <tbody>{itemHistory}</tbody>
        </Table>
      </ResponsiveTable>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const itemID = query.itemID as string;
  const initialItemDetail: ItemDetailGetResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/market-prices/${itemID}`
  ).then(res => res.json());
  return { props: { initialItemDetail, itemName: initialItemDetail?.current?.name ?? '' } };
};

export default MarketPricesDetail;
