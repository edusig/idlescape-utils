import 'styled-components';

export interface PaletteColor {
  main: string;
  contrastText?: string;
}

export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface TypographyVariantDict {
  fontFamily?: string;
  fontWeight: 'normal' | 'bold' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  fontSize: string;
  lineHeight?: number;
  allCaps?: boolean;
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type BreakpointFn = (Breakpoint) => string;

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      fontFamily: string;
      h1: TypographyVariantDict;
      h2: TypographyVariantDict;
      h3: TypographyVariantDict;
      h4: TypographyVariantDict;
      h5: TypographyVariantDict;
      h6: TypographyVariantDict;
      body1: TypographyVariantDict;
      body2: TypographyVariantDict;
      subtitle1: TypographyVariantDict;
      subtitle2: TypographyVariantDict;
      button: TypographyVariantDict;
      caption: TypographyVariantDict;
      overline: TypographyVariantDict;
    };
    palette: {
      primary: PaletteColor;
      secondary: PaletteColor;
      error: PaletteColor;
      text: {
        primary: string;
        secondary: string;
      };
      background: string;
    };
    zIndex: { [key: string]: number };
    breakpoints: {
      values: Breakpoints;
      down: BreakpointFn;
      up: BreakpointFn;
    };
  }
}
