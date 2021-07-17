import MainLayout from "@/components/MainLayout";
import Head from "next/head";

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
  return <div>Profile</div>;
}
