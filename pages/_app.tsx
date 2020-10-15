import type { AppProps /*, AppContext */ } from "next/app";


const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;