import { motion } from "framer-motion";

import styles from "@/styles/Dropdown.module.scss";

const variant = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Dropdown({ children }) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      {children}
    </motion.div>
  );
}
