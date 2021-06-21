import { slide as Menu } from "react-burger-menu";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";

import styles from "../../styles/MobileNav.module.scss";

export default function MobileNav() {
  return (
    <Menu right width={250}>
      <Link href="/profile">
        <a className={`bm-item ${styles.menuItem} ${styles.active}`}>Profile</a>
      </Link>
      <Link href="/friends">
        <a className={`bm-item ${styles.menuItem}`}>Friends</a>
      </Link>
      <Link href="/messages">
        <a className={`bm-item ${styles.menuItem}`}>Messages</a>
      </Link>
      <Link href="/feed">
        <a className={`bm-item ${styles.menuItem}`}>Feed</a>
      </Link>
      <div className={styles.hr}></div>
      <div>Search</div>
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
