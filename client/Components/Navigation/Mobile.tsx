import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

import SearchBar from "./Searchbar";
import NavLinks from "./NavLinks";
import styles from "@/styles/MobileNav.module.scss";

export default function MobileNav() {
  return (
    <Menu right width={300}>
      <NavLinks />
      <div className={styles.hr}></div>
      <SearchBar />
      <div className={styles.hr}></div>
      <Link href="/">
        <a className={`bm-item ${styles.menuItem}`}>
          <FiLogOut />
          Logout
        </a>
      </Link>
    </Menu>
  );
}
