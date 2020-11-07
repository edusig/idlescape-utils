import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Source Sans Pro", sans-serif',
  },
  palette: {
    primary: {
      main: 'rgba(0, 91, 168, 1)',
      contrastText: '#FFF',
    },
    secondary: {
      main: 'rgba(0, 151, 246, 1)',
    },
    text: {
      // Minimum contrast ration o 7:1. It passes the AAA test for small font-size
      secondary: 'rgba(0, 0, 0, 0.68)',
    },
  },
});
