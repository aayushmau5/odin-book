import { useState } from "react";

import SearchBar from "./Searchbar";
import NotificationDropdownButton from "./NotificationDropdownButton";
import ProfileDropdownButton from "./ProfileDropdownButton";
import styles from "@/styles/DesktopNav.module.scss";

export default function DesktopNav() {
  const [dropdown, setDropdown] = useState("");

  function changeDropdown(value) {
    setDropdown(value);
  }

  return (
    <div className={styles.desktopNav}>
      <SearchBar />
      <NotificationDropdownButton
        dropdown={dropdown}
        changeDropdown={changeDropdown}
      />
      <ProfileDropdownButton
        dropdown={dropdown}
        changeDropdown={changeDropdown}
      />
    </div>
  );
}
