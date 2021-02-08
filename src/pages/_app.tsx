import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "./_app.scss";


const ConversantApp = ({Component, pageProps}: AppProps) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);

export default ConversantApp;