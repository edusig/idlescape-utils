import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MUIStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet as StyledStyleSheet } from 'styled-components';

class CustomDocument extends Document {
  static async getInitialProps(ctx: any) {
    const muiSheets = new MUIStyleSheets();
    const styledSheets = new StyledStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledSheets.collectStyles(muiSheets.collect(<App {...props} />)),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          muiSheets.getStyleElement(),
          styledSheets.getStyleElement(),
        ],
      };
    } finally {
      styledSheets.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
