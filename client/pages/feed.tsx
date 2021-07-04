import Head from "next/head";

import Sidebar from "@/components/Navigation/Sidebar";

export default function Feed() {
  return (
    <>
      <Head>
        <title>Feed | Odin Book</title>
      </Head>
      <div>
        <Sidebar />
        <span>Feed</span>
        <span>Suggestions</span>
      </div>
    </>
  );
}
