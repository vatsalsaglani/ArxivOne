import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "../contexts/global";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

export default MyApp;
