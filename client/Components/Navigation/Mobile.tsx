import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import { FaDoorOpen } from "react-icons/fa";

import SearchBar from "./Searchbar";
import styles from "../../styles/MobileNav.module.scss";
import NavLinks from "./NavLinks";

export default function MobileNav() {
  return (
    <Menu right width={300}>
      <NavLinks />
      <div className={styles.hr}></div>
      <SearchBar />
      <div className={styles.hr}></div>
      <Link href="/">
        <a className={`bm-item ${styles.menuItem}`}>
          <FaDoorOpen />
          Logout
        </a>
      </Link>
    </Menu>
  );
}
