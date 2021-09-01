import Head from "next/head";

import MainLayout from "@/components/MainLayout";
import Header from "@/components/Profile/Header";
import styles from "@/styles/Profile.module.scss";
import { CommonButton } from "@/components/StyledComponents";

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
    <div className={styles.headerContainer}>
      <Header data={headerData} />
      <CommonButton marginLeft="auto">Edit</CommonButton>
    </div>
  );
}
