import { DefaultTheme } from 'styled-components';
import { Breakpoint, Breakpoints } from 'web/src/styled';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1280,
  xl: 1920,
};

const down = (breakpoints: Breakpoints) => (breakpoint: Breakpoint) => {
  let size = breakpoints[breakpoint];
  return `@media (max-width: ${size - 0.05}px)`;
};
const up = (breakpoints: Breakpoints) => (breakpoint: Breakpoint) => {
  let size = breakpoints[breakpoint];
  return `@media (min-width: ${size}px)`;
};

export const theme: DefaultTheme = {
  typography: {
    fontFamily: "'Source Code Pro', monospace",
    h1: {
      fontSize: '3.5rem',
      fontWeight: 300,
      lineHeight: 1.167,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.167,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 300,
      lineHeight: 1.235,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 300,
      lineHeight: 1.334,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.43,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      allCaps: true,
      lineHeight: 1.75,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 300,
      allCaps: true,
      lineHeight: 2.66,
    },
  },
  palette: {
    primary: {
      main: 'rgba(0, 91, 168, 1)',
      contrastText: '#FFF',
    },
    secondary: {
      main: 'rgba(0, 151, 246, 1)',
    },
    error: {
      main: 'rgba(0, 151, 246, 1)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      // Minimum contrast ration o 7:1. It passes the AAA test for small font-size
      secondary: 'rgba(0, 0, 0, 0.68)',
    },
    background: '#FFF',
  },
  zIndex: {
    appbar: 700,
    drawer: 900,
    draweOverlay: 899,
    modal: 1000,
  },
  breakpoints: {
    values: breakpoints,
    down: down(breakpoints),
    up: up(breakpoints),
  },
};
