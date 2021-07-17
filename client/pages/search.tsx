import Head from "next/head";

import MainLayout from "@/components/MainLayout";

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>Search Page | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return <div>Search Page</div>;
}
