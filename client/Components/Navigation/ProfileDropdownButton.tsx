import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { Button, Wrapper, Menu } from "react-aria-menubutton";

import Dropdown from "./Dropdown";
import styles from "@/styles/DesktopNav.module.scss";

export default function ProfileDropdownButton() {
  return (
    <Wrapper className={styles.profile}>
      <Button className={styles.dropdownButton}>
        <FiUser />
      </Button>
      <Menu>
        <Dropdown>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <Link href="/profile/settings">
            <a>Settings</a>
          </Link>
          <Link href="/">
            <a>Logout</a>
          </Link>
        </Dropdown>
      </Menu>
    </Wrapper>
  );
}
