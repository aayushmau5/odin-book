import { useState } from "react";
import { useEffect } from "react";

import Post from "./Profile/Post";

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

// generate 10 random data
// thanks github copilot
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

export default function Feed() {
  const [feed, setFeed] = useState<FeedData[]>([]);

  useEffect(() => {
    setFeed(randomData());
  }, []);

  return (
    <div>
      {feed.map((feed) => (
        <Post key={feed.id} postData={feed} />
      ))}
    </div>
  );
}
