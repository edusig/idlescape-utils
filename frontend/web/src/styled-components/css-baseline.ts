import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { theme } from '@app/util/theme';

export const CSSBaseline = createGlobalStyle`
${normalize()} 
html {
  font-family: ${theme.typography.fontFamily};
}
p { margin: 0;}
`;
