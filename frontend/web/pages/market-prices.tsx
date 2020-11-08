import * as React from 'react';
import { initializeApollo } from '../apollo/client';
import { GetServerSideProps } from 'next';
import {
  MarketSnapshotDocument,
  MarketSnapshotQuery,
  useMarketSnapshotQuery,
} from '@app/lib/graphql/hooks';
import IndexLayout from '@app/components/layout';
import { AdminTitle } from '@app/components/admin-title';
import Typography from '@app/components/typography';
import styled from 'styled-components';
import { formatNumber } from '@app/util/formatters/number';
import Image from 'next/image';
import { imageDict } from '@app/lib/game/image-dict';

const Row = styled.tr`
  &:nth-child(2n) {
    background-color: #007fd726;
  }
`;

const Cell = styled.td`
  padding: 0.5rem 0.5rem;
  border-bottom: thin solid #007fd736;
`;

const CustomCell = styled(Cell)`
  display: flex;
  align-items: center;
`;

const ItemName = styled(Typography)`
  margin-left: 1rem;
`;

const MarketPricesPage: React.FC = () => {
  const marketSnapshotQ = useMarketSnapshotQuery();
  const marketSnapshot = React.useMemo(
    () =>
      (marketSnapshotQ.data?.marketSnapshot || []).map(it => (
        <Row>
          <CustomCell>
            <Image src={imageDict[parseInt(it?.id || '3')]} width={24} height={24} />
            <ItemName variant="body2">{it?.name}</ItemName>
          </CustomCell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.minPrice || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.medianPrice || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.meanPrice || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.volume || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell>
            <Typography variant="body2" align="right">
              {formatNumber(it?.offerCount || 0, 2, 0)}
            </Typography>
          </Cell>
          <Cell></Cell>
        </Row>
      )),
    [marketSnapshotQ.data]
  );
  console.log(marketSnapshotQ.data?.marketSnapshot);
  return (
    <IndexLayout title="Market Prices">
      <AdminTitle title="Market Prices" />
      <table cellSpacing={0}>
        <thead>
          <tr>
            <Cell>
              <Typography variant="subtitle1">Item</Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1" align="right">
                Min Price
              </Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1" align="right">
                Median Price
              </Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1" align="right">
                Mean Price
              </Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1" align="right">
                Volume
              </Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1" align="right">
                Offer Count
              </Typography>
            </Cell>
            <Cell>
              <Typography variant="subtitle1">Actions</Typography>
            </Cell>
          </tr>
        </thead>
        <tbody>{marketSnapshot}</tbody>
      </table>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query<MarketSnapshotQuery>({ query: MarketSnapshotDocument });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default MarketPricesPage;
