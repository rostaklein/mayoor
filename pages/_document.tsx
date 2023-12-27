import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const cache = createCache();
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
        });

      // @ts-ignore
      const initialProps = await Document.getInitialProps(ctx);
      const style = extractStyle(cache, true);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style dangerouslySetInnerHTML={{ __html: style }} />
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
