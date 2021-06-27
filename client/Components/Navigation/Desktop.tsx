import SearchBar from "./Searchbar";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import styles from "../../styles/DesktopNav.module.scss";

export default function DesktopNav() {
  return (
    <div className={styles.desktopNav}>
      <SearchBar />
      <NotificationDropdown />
      <ProfileDropdown />
    </div>
  );
}
