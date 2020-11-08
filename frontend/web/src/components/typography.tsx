import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const getTextColor = (theme: DefaultTheme, color: TypographyColors) => {
  switch (color) {
    case 'primary':
      return theme.palette.primary.main;
    case 'secondary':
      return theme.palette.secondary.main;
    case 'error':
      return theme.palette.error.main;
    case 'textPrimary':
      return theme.palette.text.primary;
    case 'textSecondary':
      return theme.palette.text.secondary;
    default:
      return color;
  }
};

const getTextVariant = (theme: DefaultTheme, variant: TypograpyVariants) => {
  if (variant === 'inherit') {
    return '';
  }
  const style = theme.typography[variant];
  return `
    font-size: ${style.fontSize};
    font-weight: ${style.fontWeight};
    font-family: ${style.fontFamily || theme.typography.fontFamily};
    ${style.allCaps ? 'text-transform: uppercase;' : ''}
    ${style.lineHeight ? `line-height: ${style.lineHeight};` : ''}
  `;
};

const defaultVariantMapping: any = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
};

type TypographyColors =
  | 'error'
  | 'inherit'
  | 'initial'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary';

type TypograpyVariants =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

interface TypographyBaseProps {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  className?: string;
  color?: TypographyColors;
  textComponent?: React.ReactNode;
  display?: 'block' | 'initial' | 'inline';
  gutterBottom?: boolean;
  paragraph?: boolean;
  variant: TypograpyVariants;
  variantMapping?: any;
}

const TypographyBase: React.FC<TypographyBaseProps> = React.forwardRef(function Typography(
  props,
  ref
) {
  const {
    className,
    textComponent,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const Component =
    textComponent ||
    (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) ||
    'span';

  return <Component className={className} ref={ref} {...other} />;
});

export const Typography = styled(TypographyBase).attrs((attrs: TypographyBaseProps) => ({
  align: attrs.align || 'inherit',
  color: attrs.color || 'inherit',
  display: attrs.display || 'block',
  gutterBottom: attrs.gutterBottom,
  paragraph: attrs.paragraph || false,
  variant: attrs.variant || 'body1',
}))`
  text-align: ${props => props.align};
  color: ${props => getTextColor(props.theme, props.color as TypographyColors)};
  display: ${props => props.display};
  margin: 0;
  margin-bottom: ${props => (props.paragraph ? '1rem' : props.gutterBottom ? '0.35rem' : 0)};
  ${props => getTextVariant(props.theme, props.variant)}
`;

export default Typography;
