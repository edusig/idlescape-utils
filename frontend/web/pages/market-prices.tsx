import { GetServerSideProps } from 'next';
import IndexLayout from '@app/components/layout';
import { AdminTitle } from '@app/components/admin-title';
import Typography from '@app/components/typography';
import useSWR from 'swr';
import { formatNumber } from '@app/util/formatters/number';
import Image from 'next/image';
import { imageDict } from '@app/lib/game/image-dict';
import fetch from 'isomorphic-unfetch';
import { MarketPricesGetResponse } from './api/market-prices';
import formatDate from 'date-fns/format';
import { useMemo } from 'react';
import { FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import {
  ActionCell,
  Cell,
  CustomCell,
  ResponsiveTable,
  Row,
  Table,
} from '@app/styled-components/table';
import styled from 'styled-components';
import { IconButton } from '@app/components/icon-button';

export const ItemName = styled(Typography)`
  margin-left: 1rem;
`;

interface MarketPricesPageProps {
  initialMarketSnapshot: MarketPricesGetResponse;
}

const MarketPricesPage = ({ initialMarketSnapshot }: MarketPricesPageProps) => {
  const marketSnapshotQ = useSWR('/api/market-prices', { initialData: initialMarketSnapshot });
  const marketSnapshot = useMemo(
    () =>
      (marketSnapshotQ.data?.marketPrices || []).map((it: any, idx: number) => (
        <Row key={idx}>
          <CustomCell>
            <Image
              src={imageDict[it?.itemID]}
              width={32}
              height={32}
              loading={idx <= 15 ? 'eager' : 'lazy'}
              priority={idx <= 10}
            />
            <ItemName $variant="body1">{it?.name}</ItemName>
          </CustomCell>
          <Cell>
            <Typography $variant="body1" $align="right">
              {formatNumber(it?.minPrice || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography $variant="body1" $align="right">
              {formatNumber(it?.volume || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography $variant="body1" $align="right">
              {formatNumber(it?.offerCount || 0, 2, 0)}
            </Typography>
          </Cell>
          <ActionCell>
            <Link href={`/market-prices/${it?.itemID}`}>
              <IconButton>
                <FaChartLine size={20} />
              </IconButton>
            </Link>
          </ActionCell>
        </Row>
      )),
    [marketSnapshotQ.data]
  );
  const lastUpdate = useMemo(
    () =>
      (marketSnapshotQ.data?.marketPrices.length || 0) > 0
        ? `Last update at: ${formatDate(
            new Date(marketSnapshotQ.data?.marketPrices[0]!.routineAtTime!),
            'HH:mm:ss - MM/dd/yyyy'
          )}`
        : undefined,
    [marketSnapshotQ.data]
  );
  return (
    <IndexLayout title="Market Prices">
      <AdminTitle title="Market Prices" subtitle={lastUpdate} />
      <ResponsiveTable>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <Cell>
                <Typography $variant="subtitle1">Item</Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Min Price
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Volume
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Offer Count
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1">Actions</Typography>
              </Cell>
            </tr>
          </thead>
          <tbody>{marketSnapshot}</tbody>
        </Table>
      </ResponsiveTable>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialMarketSnapshot = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/market-prices`
  ).then(res => res.json());
  return { props: { initialMarketSnapshot } };
};

export default MarketPricesPage;
