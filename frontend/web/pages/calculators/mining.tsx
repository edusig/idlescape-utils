import { AdminTitle } from '@app/components/admin-title';
import IndexLayout from '@app/components/layout';
import { FC, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import Typography from '@app/components/typography';
import { formatBigNumber, formatNumber } from '@app/util/formatters/number';
import { Cell, ResponsiveTable, Table, Row, CustomCell } from '@app/styled-components/table';
import formatDate from 'date-fns/format';
import { MiningLocation } from '@app/lib/game/location-mining';
import { MiningGetResponse, MiningCalculatorLocation } from '../api/mining';
import { urlBuilder } from '@0soft/zero-lib';
import Cookies from 'cookies';
import cookieCutter from 'cookie-cutter';
import { Form } from '@app/components/hook-form/form';
import { TextField } from '@app/components/hook-form/text-field';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@app/components/button';
import { SelectField } from '@app/components/hook-form/select-field';

interface MiningCalculatorProps {
  initialData: any;
  initialOps: MiningCalculatorOptions;
}

interface MiningCalculatorOptions {
  skill: number;
  buffs_haste: number;
  buffs_gathering: number;
  buffs_superHeated: number;
  buffs_destructingTesting: number;
  buffs_scholar: number;
  food_gathering: number;
  food_gatheringStacks: number;
  food_superHeated: number;
  food_superHeatedStacks: number;
  foodIngredients_gathering: number[];
  foodIngredients_superHeated: number[];
}

const ItemImage = styled.div`
  margin-right: 1rem;
`;

const Location: FC<MiningCalculatorLocation & MiningLocation> = ({
  time,
  actsDay,
  actsHour,
  itemImage,
  level,
  summary,
  name,
}) => {
  return (
    <Row>
      <CustomCell>
        <ItemImage>
          <Image src={itemImage} width={56} height={56} />
        </ItemImage>
        <Typography $variant="body1" $align="center">
          {name} ({level})
        </Typography>
      </CustomCell>
      <Cell>
        <Typography $variant="subtitle1" $align="right">
          {formatNumber(time, 2, 0)}
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="subtitle1" $align="right">
          {formatNumber(actsHour, 2, 0)}/h
        </Typography>
        <Typography $variant="subtitle1" $align="right">
          {formatBigNumber(actsDay, 2, 0)}/day
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="subtitle1" $align="right">
          {formatNumber(summary.expHour, 2, 0)}/h
        </Typography>
        <Typography $variant="subtitle1" $align="right">
          {formatBigNumber(summary.expDay, 2, 0)}/day
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="subtitle1" $align="right">
          {formatNumber(summary.profitHour, 2, 0)}/h
        </Typography>
        <Typography $variant="subtitle1" $align="right">
          {formatBigNumber(summary.profitDay, 2, 0)}/day
        </Typography>
      </Cell>
      <Cell>
        <Typography $variant="subtitle1" $align="right">
          {formatNumber(summary.profitHourFood, 2, 0)}/h
        </Typography>
        <Typography $variant="subtitle1" $align="right">
          {formatBigNumber(summary.profitDayFood, 2, 0)}/day
        </Typography>
      </Cell>
    </Row>
  );
};

const defaultOptions = {
  skill: 70,
  buffs_destructingTesting: 0,
  buffs_gathering: 0,
  buffs_haste: 0,
  buffs_scholar: 0,
  buffs_superHeated: 0,
  food_gathering: 0,
  food_gatheringStacks: 0,
  food_superHeated: 0,
  food_superHeatedStacks: 0,
  foodIngredients_gathering: [],
  foodIngredients_superHeated: [],
};

export const MiningCalculator: FC<MiningCalculatorProps> = ({
  initialData,
  initialOps = defaultOptions,
}) => {
  const [options, setOptions] = useState<MiningCalculatorOptions>(initialOps);
  const methods = useForm({ defaultValues: options });
  const miningQ = useSWR<MiningGetResponse>(urlBuilder('/api/mining', { params: options }), {
    initialData: initialData,
  });
  const lastUpdate = useMemo(
    () =>
      (miningQ.data?.latestUpdate || 0) > 0
        ? `Last update at: ${formatDate(
            new Date(miningQ.data?.latestUpdate || 0),
            'HH:mm:ss - MM/dd/yyyy'
          )}`
        : undefined,
    [miningQ.data]
  );
  const locations = useMemo(() => (miningQ.data?.locations || []).map(it => <Location {...it} />), [
    miningQ.data,
  ]);
  const handleUpdateOptions = (values: any) => {
    console.log('UPDATE OPTIONS', values);
    setOptions(prev => ({ ...prev, ...values }));
  };
  useEffect(() => {
    miningQ.revalidate();
  }, [options]);
  return (
    <IndexLayout title="Mining Calculator">
      <AdminTitle
        title="Mining Calculator"
        subtitle="Dig Dig Dig!"
        subtitle2={lastUpdate}
        img={<Image src="/images/mining/iron_pickaxe.png" width={96} height={96} />}
        backLink="/calculators"
      />
      <FormProvider {...methods}>
        <Form onSubmit={handleUpdateOptions}>
          <TextField name="skill" />
          <SelectField
            name="buffs_superHeated"
            label="Super Heated"
            options={[
              { label: '0%', value: 0 },
              { label: '1%', value: 0.01 },
              { label: '2%', value: 0.02 },
              { label: '3%', value: 0.03 },
              { label: '4%', value: 0.04 },
              { label: '5%', value: 0.05 },
              { label: '6%', value: 0.06 },
            ]}
          />
          <button type="submit">Send</button>
        </Form>
      </FormProvider>
      <ResponsiveTable>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <Cell>
                <Typography $variant="subtitle1">Location</Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Time
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Actions
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Exp
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Profit
                </Typography>
              </Cell>
              <Cell>
                <Typography $variant="subtitle1" $align="right">
                  Profit +Food
                </Typography>
              </Cell>
            </tr>
          </thead>
          <tbody>{locations}</tbody>
        </Table>
      </ResponsiveTable>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  let options: MiningCalculatorOptions | undefined;
  let cookieOps = cookies.get('miningOps');
  if (cookieOps != null) {
    try {
      options = JSON.parse(cookieOps);
    } catch (e) {
      console.error(e);
    }
  }
  if (options == null) {
    options = defaultOptions;
  }
  console.log('OPTIONS', options);
  const initialData = await fetch(
    urlBuilder(`${process.env.NEXT_PUBLIC_API_HOST}/api/mining`, { params: options })
  ).then(res => res.json());
  return { props: { initialData } };
};

export default MiningCalculator;
