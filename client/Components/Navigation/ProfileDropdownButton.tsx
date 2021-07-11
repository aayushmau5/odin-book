import { FiUser } from "react-icons/fi";
import Link from "next/link";

import Dropdown from "./Dropdown";
import styles from "@/styles/DesktopNav.module.scss";

export default function ProfileDropdownButton({ dropdown, changeDropdown }) {
  function toggleDropdown() {
    if (dropdown === "profile") {
      changeDropdown("");
    } else {
      changeDropdown("profile");
    }
  }

  return (
    <button className={styles.profile} onClick={toggleDropdown}>
      <FiUser />
      {dropdown === "profile" ? (
        <Dropdown>
          <Link href="/">
            <a>Profile</a>
          </Link>
          <Link href="/">
            <a>Settings</a>
          </Link>
          <Link href="/">
            <a>Logout</a>
          </Link>
        </Dropdown>
      ) : null}
    </button>
  );
}
