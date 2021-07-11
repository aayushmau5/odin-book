import Head from "next/head";

import MainLayout from "@/components/MainLayout";
import Feed from "@/components/Feed";
import Suggestions from "@/components/Suggestions";

export default function FeedPage() {
  return (
    <>
      <Head>
        <title>Feed | Odin Book</title>
      </Head>
      <MainLayout centerComponent={<Feed />} rightComponent={<Suggestions />} />
    </>
  );
}
