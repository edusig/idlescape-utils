import { AdminTitle } from '@app/components/admin-title';
import IndexLayout from '@app/components/layout';
import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Typography from '@app/components/typography';
import Link from 'next/link';

interface HeatCostBenefirCalculatorProps {
  initialItems: any;
}

interface CalculatorProps {
  image?: string;
  title: string;
  url: string;
}

const CalculatorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CalculatorsItem = styled.div`
  border: 2px solid #ddd;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  margin: 0.5rem;
  max-width: 164px;
`;

const Calculator: FC<CalculatorProps> = ({ title, image, url }) => {
  return (
    <Link href={url}>
      <CalculatorsItem>
        {image != null && <Image src={image} width={160} height={160} />}
        <Typography $variant="body1" $align="center">
          {title}
        </Typography>
      </CalculatorsItem>
    </Link>
  );
};

export const HeatCostBenefitCalculator: FC<HeatCostBenefirCalculatorProps> = () => {
  return (
    <IndexLayout title="Calculators">
      <AdminTitle
        title="Calculators"
        subtitle="Looks like someone wants to strategize in a idle game"
      />
      <CalculatorsList>
        <Calculator
          url="/calculators/heat-cost-benefit"
          image="/images/heat_icon.png"
          title="Heat Cost Benefit"
        />
      </CalculatorsList>
    </IndexLayout>
  );
};

export default HeatCostBenefitCalculator;
