import { AdminTitle } from '@app/components/admin-title';
import IndexLayout from '@app/components/layout';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { GetServerSideProps } from 'next';
import { ItemsHeat, ItemHeatDetail } from '@app/lib/game/items-heat';
import { MarketPricesGetResponse, MarketPricesItemDetail } from '../api/market-prices';
import styled from 'styled-components';
import Typography from '@app/components/typography';
import { formatBigNumber, formatNumber } from '@app/util/formatters/number';
import { Cell, ResponsiveTable, Table, Row, CustomCell } from '@app/styled-components/table';
import Link from 'next/link';
import { FaChartLine } from 'react-icons/fa';

interface HeatCostBenefirCalculatorProps {
  initialMarketSnapshot: any;
}

interface HeatItemProps {
  item: MarketPricesItemDetail;
  heatItem: ItemHeatDetail;
  pph: number;
}

const HeatItemImage = styled.div`
  margin-right: 1rem;
`;

const HeatItem: FC<HeatItemProps> = ({ item, heatItem, pph }) => {
  return (
    <Row>
      <CustomCell>
        <HeatItemImage>
          <Image src={heatItem.itemImage} width={32} height={32} />
        </HeatItemImage>
        <Typography $variant="body1" $align="center">
          {heatItem.name}
        </Typography>
      </CustomCell>
      <Cell>
        <Typography $variant="body1" $align="right">
          {formatNumber(pph, 2, 0)}
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="body1" $align="right">
          {formatNumber(item.minPrice || 0, 2, 0)}
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="body1" $align="right">
          {formatBigNumber(item.volume || 0, 2, 0)}
        </Typography>
      </Cell>
      <Cell>
        <Link href={`/market-prices/${item.id}`}>
          <FaChartLine size={24} />
        </Link>
      </Cell>
    </Row>
  );
};

export const HeatCostBenefitCalculator: FC<HeatCostBenefirCalculatorProps> = ({
  initialMarketSnapshot,
}) => {
  const marketSnapshotQ = useSWR<MarketPricesGetResponse>('/api/market-prices', {
    initialData: initialMarketSnapshot,
  });
  const items = useMemo(() => {
    return marketSnapshotQ.data?.marketPrices
      .filter(it => ItemsHeat.hasOwnProperty(it.id))
      .map(it => ({
        item: it,
        pph: it.minPrice / (ItemsHeat[parseInt(it.id)]!.heat || 1),
      }))
      .sort((a, b) => a.pph - b.pph)
      .map(it => <HeatItem {...it} heatItem={ItemsHeat[parseInt(it.item.id)]} />);
  }, [marketSnapshotQ.data]);
  return (
    <IndexLayout title="Heat Cost Benefit Calculator">
      <AdminTitle
        title="Heat Cost Benefit Calculator"
        subtitle="So you want to BBQ for the lowest, you came to the right place"
        img={<Image src="/images/heat_icon.png" width={96} height={96} />}
        backLink="/calculators"
      />
      <ResponsiveTable>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <Cell>
                <Typography $variant="subtitle1">Item</Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Cost Per Heat
                </Typography>
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
                <Typography $variant="subtitle1">Actions</Typography>
              </Cell>
            </tr>
          </thead>
          <tbody>{items}</tbody>
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

export default HeatCostBenefitCalculator;
