import { motion } from "framer-motion";

import containerStyles from "../styles/LoginForm.module.scss";

interface Props {
  children: any;
}

const variant = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 70,
    },
  },
};

export default function Form({ children }: Props) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      className={containerStyles.form}
    >
      {children}
    </motion.div>
  );
}
