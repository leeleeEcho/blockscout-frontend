import type { DocumentContext } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import logRequestFromBot from 'nextjs/utils/logRequestFromBot';
import * as serverTiming from 'nextjs/utils/serverTiming';

import config from 'configs/app';
import * as svgSprite from 'ui/shared/IconSvg';

const marketplaceFeature = config.features.marketplace;

const isExternalFontStylesheet = (url: string | undefined | null): url is string => {
  return Boolean(url && /^https?:\/\//i.test(url));
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = async() => {
      const start = Date.now();
      const result = await originalRenderPage();
      const end = Date.now();

      serverTiming.appendValue(ctx.res, 'renderPage', end - start);

      return result;
    };

    await logRequestFromBot(ctx.req, ctx.res, ctx.pathname);

    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          { /* FONTS: local @font-face in nextjs/global.css; optional http(s) env URLs add <link> below. */ }
          { (() => {
            const bodyUrl = config.UI.fonts.body?.url;
            const headingUrl = config.UI.fonts.heading?.url;
            const displayUrl = config.UI.fonts.display?.url;
            return (
              <>
                { isExternalFontStylesheet(bodyUrl) && <link href={ bodyUrl } rel="stylesheet"/> }
                { isExternalFontStylesheet(headingUrl) && headingUrl !== bodyUrl && (
                  <link href={ headingUrl } rel="stylesheet"/>
                ) }
                { isExternalFontStylesheet(displayUrl) && <link href={ displayUrl } rel="stylesheet"/> }
              </>
            );
          })() }

          { /* eslint-disable-next-line @next/next/no-sync-scripts */ }
          <script src="/assets/envs.js"/>
          { config.features.multichain.isEnabled && (
            <>
              { /* eslint-disable-next-line @next/next/no-sync-scripts */ }
              <script src="/assets/multichain/config.js"/>
            </>
          ) }
          { marketplaceFeature.isEnabled && marketplaceFeature.essentialDapps && (
            <>
              { /* eslint-disable-next-line @next/next/no-sync-scripts */ }
              <script src="/assets/essential-dapps/chains.js"/>
            </>
          ) }

          { /* FAVICON */ }
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon/favicon-48x48.png"/>
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-chrome-192x192.png"/>
          <link rel="preload" as="image" href={ svgSprite.href }/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
