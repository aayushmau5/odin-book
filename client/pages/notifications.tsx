import Head from "next/head";

import MainLayout from "@/components/MainLayout";

export default function NotificationsPage() {
  return (
    <>
      <Head>
        <title>Notifications | Odin Book</title>
      </Head>
      <MainLayout centerComponent={data()} />
    </>
  );
}

function data() {
  return <div>Notifications</div>;
}
