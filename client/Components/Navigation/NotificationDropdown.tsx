import { FaBell } from "react-icons/fa";

import styles from "../../styles/DesktopNav.module.scss";

export default function NotificationDropdown() {
  return (
    <button className={styles.notification}>
      <FaBell />
    </button>
  );
}
