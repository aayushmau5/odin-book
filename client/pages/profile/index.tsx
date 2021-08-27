import Head from "next/head";

import MainLayout from "@/components/MainLayout";
import Header from "@/components/Profile/Header";

const headerData = {
  imageUrl: "sherlock.jpg",
  name: "Sherlock Holmes",
  email: "sherlock@bakerstreet.com",
};

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile | Odin Book</title>
      </Head>
      <MainLayout centerComponent={profileData()} />
    </>
  );
}

function profileData() {
  return (
    <div>
      <Header data={headerData} />
    </div>
  );
}
