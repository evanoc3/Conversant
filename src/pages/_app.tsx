import type { FunctionComponent } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "next-auth/client";
import "./_app.scss";


const ConversantApp: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Head>
      <meta charSet="utf-8" />
			<meta name="author" content="Evan O'Connor <e.oconnor47@nuigalway.ie>" />

      {/* PWA meta tags */}
      <link rel="manifest" href="/static/manifest.json" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Conversant" />
      <meta name="description" content="The natural language learning platform" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Conversant" />
      <meta name="format-detection" content="telephone=no" />
      {/* <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" /> */}
      <meta name="theme-color" content="#000000" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link rel="apple-touch-icon" sizes="192x192" href="/icons/logo-192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
    </Head>

    <Component {...pageProps} />
  </Provider>
);

export default ConversantApp;