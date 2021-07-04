import Links from "./NavLinks";
import styles from "@/styles/Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <Links />
    </div>
  );
}
