import Head from "next/head";
import Nav from "../Components/Navigation/Nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile Setup | Odin Book</title>
        <meta property="og:title" content="Profile Setup | Odin Book" />
        <meta property="og:description" content="Setup your profile" />
      </Head>
      <Nav />
    </>
  );
}
