import styles from "@/styles/Dropdown.module.scss";

export default function Dropdown({ children }) {
  return <div className={styles.container}>{children}</div>;
}
