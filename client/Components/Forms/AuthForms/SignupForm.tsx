import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

import { Button } from "@/components/StyledComponents";
import AuthFormikForm from "./AuthFormikForm";
import containerStyles from "@/styles/LoginForm.module.scss";

interface Props {
  toggleActive: () => void;
}

const variant = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      transition: "spring",
      damping: 15,
      duration: 0.3,
    },
  },
  exit: {
    x: "5%",
    opacity: 0,
    transition: {
      transition: "spring",
      damping: 15,
      duration: 0.3,
    },
  },
};

export default function SignupForm({ toggleActive }: Props) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className={containerStyles.form__header}>Signup</h2>
      <AuthFormikForm isLogin={false} />
      <h3 className={containerStyles.form__separator}>OR</h3>
      <Button>Signup with Google</Button>
      <p className={containerStyles.form__signup_paragraph}>
        <button
          className={containerStyles.form__signup_link}
          onClick={toggleActive}
        >
          <FaArrowLeft className={containerStyles.arrow} /> Login,
        </button>
        if you already have an account
      </p>
    </motion.div>
  );
}
