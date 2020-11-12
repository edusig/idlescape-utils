import * as React from 'react';
import styled from 'styled-components';
import Typography from './typography';

const AdminTitleContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
`;

type LoadingValue = 'lazy' | 'eager' | undefined;
type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;
export type ImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'
> & {
  src: string;
  quality?: number | string;
  priority?: boolean;
  loading?: LoadingValue;
  unoptimized?: boolean;
} & (
    | {
        width?: never;
        height?: never;
        /** @deprecated Use `layout="fill"` instead */
        unsized: true;
      }
    | {
        width?: never;
        height?: never;
        layout: 'fill';
      }
    | {
        width: number | string;
        height: number | string;
        layout?: Exclude<LayoutValue, 'fill'>;
      }
  );

export interface AdminTitleProps {
  title: string;
  subtitle?: string;
  backLink?: string;
  backLabel?: string;
  img?: React.ReactNode;
}

export const AdminTitle: React.FC<AdminTitleProps> = ({ title, subtitle, img }) => {
  return (
    <AdminTitleContainer>
      {img != null ? img : undefined}
      <Typography $variant="h3" textComponent="h1">
        {title}
      </Typography>
      {subtitle != null && (
        <Typography $variant="body1" $color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </AdminTitleContainer>
  );
};
