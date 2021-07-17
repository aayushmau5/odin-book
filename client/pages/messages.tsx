import Head from "next/head";

import MainLayout from "@/components/MainLayout";

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>Messages | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return <div>Messages</div>;
}
