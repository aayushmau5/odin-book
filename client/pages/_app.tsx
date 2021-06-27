import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../Components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
