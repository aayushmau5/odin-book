import SearchBar from "./Searchbar";
import NotificationDropdownButton from "./NotificationDropdownButton";
import ProfileDropdownButton from "./ProfileDropdownButton";
import styles from "@/styles/DesktopNav.module.scss";

export default function DesktopNav() {
  return (
    <div className={styles.desktopNav}>
      <SearchBar />
      <NotificationDropdownButton />
      <ProfileDropdownButton />
    </div>
  );
}
