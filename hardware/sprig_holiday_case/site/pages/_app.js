import "../styles/globals.css";
import { Provider } from "react-wrap-balancer";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
