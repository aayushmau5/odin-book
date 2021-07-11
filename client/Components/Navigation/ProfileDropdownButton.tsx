import { FiUser } from "react-icons/fi";

import styles from "@/styles/DesktopNav.module.scss";

export default function ProfileDropdownButton() {
  return (
    <button className={styles.profile}>
      <FiUser />
    </button>
  );
}
