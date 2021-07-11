import { BsBell } from "react-icons/bs";

import styles from "@/styles/DesktopNav.module.scss";

export default function NotificationDropdownButton() {
  return (
    <button className={styles.notification}>
      <BsBell />
    </button>
  );
}
