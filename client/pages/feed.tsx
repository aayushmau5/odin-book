import Head from "next/head";

import FeedLayout from "@/components/FeedLayout";
import Feed from "@/components/Feed";
import Suggestions from "@/components/Suggestions";

export default function FeedPage() {
  return (
    <>
      <Head>
        <title>Feed | Odin Book</title>
      </Head>
      <FeedLayout feed={<Feed />} suggestion={<Suggestions />} />
    </>
  );
}
