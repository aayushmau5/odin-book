import Head from "next/head";

import styles from "../../styles/ProfileSetup.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Profile Setup | Odin Book</title>
      </Head>
      <div className={styles.Wrapper}>
        <h3>Welcome to Odin Book!</h3>
        <p>Let&apos;s setup your profile</p>
      </div>
    </>
  );
}
