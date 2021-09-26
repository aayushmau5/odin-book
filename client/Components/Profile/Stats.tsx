import styles from "@/styles/Stats.module.scss";

interface ProfileStats {
  posts: number;
  friends: number;
}

export default function Stats({ posts, friends }: ProfileStats) {
  return (
    <ul className={styles.stats}>
      <li>
        {posts} {posts === 1 ? "Post" : "Posts"}
      </li>
      <li>
        {friends} {friends === 1 ? "Friend" : "Friends"}
      </li>
    </ul>
  );
}
