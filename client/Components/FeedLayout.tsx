import Sidebar from "./Navigation/Sidebar";
import { MediaContextProvider, Media } from "./Responsive/Media";
import styles from "@/styles/FeedLayout.module.scss";

export default function FeedLayout({ feed, suggestion }) {
  return (
    <div className={styles.layoutContainer}>
      <MediaContextProvider>
        <Media className={styles.fresnelSidebar} greaterThanOrEqual="md">
          <Sidebar />
        </Media>
        <Media className={styles.fresnelMain} greaterThanOrEqual="xs">
          {feed}
        </Media>
        <Media className={styles.fresnelSuggestion} greaterThanOrEqual="lg">
          {suggestion}
        </Media>
      </MediaContextProvider>
    </div>
  );
}
