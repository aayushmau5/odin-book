import Head from "next/head";

import MainLayout from "@/components/MainLayout";

export default function PostPage() {
  return (
    <>
      <Head>
        <title>Title of post | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return <div>Post data</div>;
}
