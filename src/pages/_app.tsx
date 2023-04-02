import { AppProps } from "next/app";
import "../styles/globals.css";
import AuthContextProvider from "../context/AuthContext";
import SearchContextProvider from "../context/SearchContext";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
