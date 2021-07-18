import styles from "@/styles/Feed.module.scss";

interface FeedData {
  id: string;
  image?: string;
  data?: string;
  createdAt: string;
  author: string;
}

const feedData: FeedData[] = [];

export default function Feed() {
  return (
    <div>
      <div>Post maker form</div>
      <div>and a bunch of posts</div>
      {feedData.map((feed) => (
        <div key={feed.id} className={styles.feed}>
          Feed
        </div>
      ))}
    </div>
  );
}
