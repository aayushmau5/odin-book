import { FaUser } from "react-icons/fa";

import styles from "@/styles/DesktopNav.module.scss";

export default function ProfileDropdownButton() {
  return (
    <button className={styles.profile}>
      <FaUser />
    </button>
  );
}
