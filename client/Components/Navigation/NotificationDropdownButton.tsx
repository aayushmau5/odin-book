import { BsBell } from "react-icons/bs";
import Link from "next/link";

import Dropdown from "./Dropdown";
import styles from "@/styles/DesktopNav.module.scss";

export default function NotificationDropdownButton({
  dropdown,
  changeDropdown,
}) {
  function toggleDropdown() {
    if (dropdown === "notification") {
      changeDropdown("");
    } else {
      changeDropdown("notification");
    }
  }

  return (
    <button className={styles.notification} onClick={toggleDropdown}>
      <BsBell />
      {dropdown === "notification" ? (
        <Dropdown>
          <Link href="/">
            <a>Notification 1</a>
          </Link>
          <Link href="/">
            <a>Notification 2</a>
          </Link>
          <Link href="/">
            <a>Notification 3</a>
          </Link>
          <Link href="/">
            <a>Notification 4</a>
          </Link>
          <Link href="/">
            <a>Show all notifications</a>
          </Link>
        </Dropdown>
      ) : null}
    </button>
  );
}
