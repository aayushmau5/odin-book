import Head from "next/head";

import FeedLayout from "@/components/FeedLayout";
import GenerateFeed from "@/components/GenerateFeed";
import Suggestions from "@/components/Suggestions";

export default function Feed() {
  return (
    <>
      <Head>
        <title>Feed | Odin Book</title>
      </Head>
      <FeedLayout
        feed={<GenerateFeed />}
        suggestion={<Suggestions />}
      ></FeedLayout>
    </>
  );
}
