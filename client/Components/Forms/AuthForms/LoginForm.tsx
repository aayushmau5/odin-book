import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import { Button } from "@/components/StyledComponents";
import containerStyles from "@/styles/LoginForm.module.scss";
import AuthFormikForm from "./AuthFormikForm";

interface Props {
  toggleActive: () => void;
}

const variant = {
  initial: {
    x: "-100%",
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
    x: "-5%",
    opacity: 0,
    transition: {
      transition: "spring",
      duration: 0.3,
    },
  },
};

export default function LoginForm({ toggleActive }: Props) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className={containerStyles.form__header}>Login</h2>
      <AuthFormikForm isLogin={true} />
      <h3 className={containerStyles.form__separator}>OR</h3>
      <Button>Login with Google</Button>
      <p className={containerStyles.form__signup_paragraph}>
        Don&apos;t have an account?{" "}
        <button
          className={containerStyles.form__signup_link}
          onClick={toggleActive}
        >
          Signup <FaArrowRight className={containerStyles.arrow} />
        </button>
      </p>
    </motion.div>
  );
}
