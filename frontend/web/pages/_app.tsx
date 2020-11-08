import * as React from 'react';
import { AppProps } from 'next/app';
import { theme } from '@app/util/theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DefaultSEO } from '@app/components/default-seo';
import { GlobalSnackbar } from '@app/components/feedback/global-snackbar';
import { CSSBaseline } from '@app/styled-components/css-baseline';
import { SWRConfig } from 'swr';
import { endpointConfig } from '@app/lib/config/api';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles != null) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  });
  return (
    <SWRConfig value={endpointConfig}>
      <StyledThemeProvider theme={theme}>
        <CSSBaseline />
        <DefaultSEO />
        <Component {...pageProps} key={router.route} />
        <GlobalSnackbar />
      </StyledThemeProvider>
    </SWRConfig>
  );
};

export default CustomApp;
