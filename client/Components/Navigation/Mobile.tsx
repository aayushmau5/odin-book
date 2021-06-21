import { slide as Menu } from "react-burger-menu";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";

import styles from "../../styles/MobileNav.module.scss";

interface Props {
  pageRoute: string;
}

export default function MobileNav({ pageRoute }: Props) {
  function setActive(desiredRoute: string = ""): string | null {
    if (pageRoute === `/profile${desiredRoute}`) {
      return styles.active;
    }
    return null;
  }

  return (
    <Menu right width={250}>
      <Link href="/profile">
        <a className={`bm-item ${styles.menuItem} ${setActive()}`}>Profile</a>
      </Link>
      <Link href="/profile/friends">
        <a className={`bm-item ${styles.menuItem} ${setActive("/friends")}`}>
          Friends
        </a>
      </Link>
      <Link href="/profile/messages">
        <a className={`bm-item ${styles.menuItem} ${setActive("/messages")}`}>
          Messages
        </a>
      </Link>
      <Link href="/profile/feed">
        <a className={`bm-item ${styles.menuItem} ${setActive("/feed")}`}>
          Feed
        </a>
      </Link>
      <div className={styles.hr}></div>
      <div>Search Bar</div>
      <div className={styles.hr}></div>
      <Link href="/">
        <a className={`bm-item ${styles.menuItem}`}>
          <IoExitOutline />
          Logout
        </a>
      </Link>
    </Menu>
  );
}
