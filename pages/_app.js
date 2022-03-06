import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "../contexts/global";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
