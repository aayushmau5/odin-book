import { BsBell } from "react-icons/bs";
import { AiOutlineUnorderedList, AiOutlineMessage } from "react-icons/ai";
import { FiUser, FiUsers } from "react-icons/fi";
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
          <FiUser />
          Profile
        </a>
      </Link>
      <Link href="/friends">
        <a className={`bm-item ${styles.menuItem} ${setActive("/friends")}`}>
          <FiUsers />
          Friends
        </a>
      </Link>
      <Link href="/messages">
        <a className={`bm-item ${styles.menuItem} ${setActive("/messages")}`}>
          <AiOutlineMessage />
          Messages
        </a>
      </Link>
      <Link href="/feed">
        <a className={`bm-item ${styles.menuItem} ${setActive("/feed")}`}>
          <AiOutlineUnorderedList />
          Feed
        </a>
      </Link>
      <Link href="/notifications">
        <a
          className={`bm-item ${styles.menuItem} ${setActive(
            "/notifications"
          )}`}
        >
          <BsBell />
          Notifications
        </a>
      </Link>
    </>
  );
}
