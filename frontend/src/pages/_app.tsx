import "../styles/globals.scss";
// import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavBar";
import React from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div>
    {/* // <SessionProvider session={session}> */}
      <PopulatedNavBar />
      <Component {...pageProps} />
    {/* // </SessionProvider> */}
    </div>
  );
}

export default MyApp;
