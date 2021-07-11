import MainLayout from "@/components/MainLayout";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile | Odin Book</title>
      </Head>
      <MainLayout centerComponent={<h1>Profile</h1>} />
    </>
  );
}
