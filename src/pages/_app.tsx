import type { AppProps } from "next/app";
import "./_app.scss";


const ConversantApp = ({Component, pageProps}: AppProps) => (
  <Component {...pageProps} />
);

export default ConversantApp;