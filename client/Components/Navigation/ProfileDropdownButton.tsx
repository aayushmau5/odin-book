import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
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
            <a>
              <div className={styles.dropdownLinks}>
                <FiUser />
                Profile
              </div>
            </a>
          </Link>
          <Link href="/profile/settings">
            <a>
              <div className={styles.dropdownLinks}>
                <FiSettings />
                Settings
              </div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={styles.dropdownLinks}>
                <FiLogOut />
                Logout
              </div>
            </a>
          </Link>
        </Dropdown>
      </Menu>
    </Wrapper>
  );
}
