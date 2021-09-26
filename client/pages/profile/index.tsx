import Head from "next/head";
import { useState, useEffect } from "react";

import MainLayout from "@/components/MainLayout";
import Header from "@/components/Profile/Header";
import styles from "@/styles/Profile.module.scss";
import { CommonButton } from "@/components/StyledComponents";
import Stats from "@/components/Profile/Stats";
import Post from "@/components/Profile/Post";

const headerData = {
  imageUrl: "sherlock.jpg",
  name: "Sherlock Holmes",
  email: "sherlock@bakerstreet.com",
  posts: 2,
  friends: 10,
};
interface FeedData {
  id: string;
  image?: string;
  data?: string;
  createdAt: string;
  like: number;
  comments: number;
  author: {
    username: string;
    name: string;
    image?: string;
  };
}

const randomData = () => {
  const feedData: FeedData[] = [];
  for (let i = 0; i < 10; i++) {
    const id = `${Math.random().toString(36).substr(2, 9)}`;
    const image = `https://placeimg.com/800/800/any`;
    const data = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla facilisi. Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
    cursus a, aliquam in, libero. Cras elementum ultrices diam. Sed auctor odio
    ligula, in mollis nunc ultrices a. Aenean massa. Cum sociis natoque penatibus
    et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero,
    a pharetra augue.`;
    const createdAt = `${new Date().toISOString()}`;
    const like = Math.floor(Math.random() * 10);
    const comments = Math.floor(Math.random() * 10);
    const author = {
      username: `${Math.random().toString(36).substr(2, 9)}`,
      name: `${Math.random().toString(36).substr(2, 9)}`,
    };
    feedData.push({
      id,
      image,
      data,
      createdAt,
      like,
      comments,
      author,
    });
  }
  return feedData;
};

export default function Profile() {
  const [feed, setFeed] = useState<FeedData[]>([]);

  useEffect(() => {
    setFeed(randomData());
  }, []);

  return (
    <>
      <Head>
        <title>Profile | Odin Book</title>
      </Head>
      <MainLayout centerComponent={profileData(feed)} />
    </>
  );
}

function profileData(feed) {
  return (
    <>
      <Heading />
      <div className={styles.profile_data}>
        <Stats posts={headerData.posts} friends={headerData.friends} />
        <div className={styles.posts_container}>
          {feed.map((feed) => (
            <Post key={feed.id} postData={feed} showLikeAndComment={false} />
          ))}
        </div>
      </div>
    </>
  );
}

function Heading() {
  return (
    <div className={styles.headerContainer}>
      <Header data={headerData} />
      <CommonButton marginLeft="auto">Edit</CommonButton>
    </div>
  );
}
