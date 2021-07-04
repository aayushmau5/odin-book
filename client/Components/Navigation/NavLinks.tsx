import {
  FaUser,
  FaUsers,
  FaFacebookMessenger,
  FaList,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/MobileNav.module.scss";

export default function Links() {
  const { route } = useRouter();

  function setActive(desiredRoute: string = ""): string | null {
    if (route === desiredRoute) {
      return styles.active;
    }
    return "";
  }

  return (
    <>
      <Link href="/profile">
        <a className={`bm-item ${styles.menuItem} ${setActive("/profile")}`}>
          <FaUser />
          Profile
        </a>
      </Link>
      <Link href="/friends">
        <a className={`bm-item ${styles.menuItem} ${setActive("/friends")}`}>
          <FaUsers />
          Friends
        </a>
      </Link>
      <Link href="/messages">
        <a className={`bm-item ${styles.menuItem} ${setActive("/messages")}`}>
          <FaFacebookMessenger />
          Messages
        </a>
      </Link>
      <Link href="/feed">
        <a className={`bm-item ${styles.menuItem} ${setActive("/feed")}`}>
          <FaList />
          Feed
        </a>
      </Link>
      <Link href="/profile/feed">
        <a
          className={`bm-item ${styles.menuItem} ${setActive(
            "/notifications"
          )}`}
        >
          <FaBell />
          Notifications
        </a>
      </Link>
    </>
  );
}
