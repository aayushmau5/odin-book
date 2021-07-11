import { BsBell } from "react-icons/bs";
import Link from "next/link";
import { Button, Wrapper, Menu } from "react-aria-menubutton";

import Dropdown from "./Dropdown";
import styles from "@/styles/DesktopNav.module.scss";

export default function NotificationDropdownButton() {
  return (
    <Wrapper className={styles.notification}>
      <Button className={styles.dropdownButton}>
        <BsBell />
      </Button>
      <Menu>
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
      </Menu>
    </Wrapper>
  );
}
