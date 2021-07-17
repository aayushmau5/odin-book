import Head from "next/head";

import MainLayout from "@/components/MainLayout";

export default function friendsPage() {
  return (
    <>
      <Head>
        <title>Friends | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return <div>FriendsData</div>;
}
