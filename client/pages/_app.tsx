import Head from "next/head";
import { useRouter } from "next/router";

import Nav from "../Components/Navigation/Nav";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {router.route !== "/" && router.route !== "/_error" ? <Nav /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
