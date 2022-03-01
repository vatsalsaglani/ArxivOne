import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "../contexts/global";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </SessionProvider>
  );
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

export default MyApp;
