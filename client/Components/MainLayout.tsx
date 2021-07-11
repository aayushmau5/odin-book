import Sidebar from "./Navigation/Sidebar";
import { MediaContextProvider, Media } from "./Responsive/Media";
import styles from "@/styles/MainLayout.module.scss";

export default function MainLayout({ centerComponent, rightComponent = null }) {
  return (
    <div className={styles.layoutContainer}>
      <MediaContextProvider>
        <Media className={styles.fresnelSidebar} greaterThanOrEqual="md">
          <Sidebar />
        </Media>
        <Media className={styles.fresnelMain} greaterThanOrEqual="xs">
          {centerComponent}
        </Media>
        {rightComponent !== null ? (
          <Media className={styles.fresnelSuggestion} greaterThanOrEqual="lg">
            {rightComponent}
          </Media>
        ) : null}
      </MediaContextProvider>
    </div>
  );
}
