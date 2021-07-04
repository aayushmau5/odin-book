import { FaBell } from "react-icons/fa";

import styles from "@/styles/DesktopNav.module.scss";

export default function NotificationDropdownButton() {
  return (
    <button className={styles.notification}>
      <FaBell />
    </button>
  );
}
