import * as React from 'react';
import { AppProps } from 'next/app';
import { theme } from '@app/util/theme';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import { NProgressStyleCreator, usePageLoader } from '@0soft/use-nextjs-page-loader';
import { DefaultSEO } from '@app/components/default-seo';
import { GlobalSnackbar } from '@app/components/feedback/global-snackbar';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';

const NProgressStyle = NProgressStyleCreator('rgba(0, 91, 168, 1)');

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const CustomApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  usePageLoader();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles != null) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  });
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <DefaultSEO />
          <CssBaseline />
          <StyledThemeProvider theme={theme}>
            <Component {...pageProps} key={router.route} />
            <GlobalSnackbar />
            <NProgressStyle />
          </StyledThemeProvider>
        </StylesProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default CustomApp;
