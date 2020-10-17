import type { AppProps } from "next/app";
import "./_app.scss";


const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;