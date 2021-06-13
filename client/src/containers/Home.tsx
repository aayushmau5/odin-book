import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaGithub } from "react-icons/fa";

import styles from "../styles/Home.module.scss";
import LoginForm from "../Components/AuthForms/LoginForm";
import FormContainer from "../Components/FormContainer";
import SignupForm from "../Components/AuthForms/SignupForm";

const variant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Home() {
  const [loginActive, setLoginActive] = useState(true);

  const toggleLoginActive = () => {
    setLoginActive((active) => !active);
  };

  return (
    <div className={styles.home}>
      <motion.div
        className={styles.home__hero}
        variants={variant}
        initial="initial"
        animate="animate"
      >
        <FaBook className={styles.home__logo} />
        <header className={styles.home__header}>Odin Book</header>
        <h3 className={styles.home__sub_header}>
          Connect with your friends and families
        </h3>
        <h3 className={styles.home__featureheader}>Features:</h3>
        <ol className={styles.home__featurelist}>
          <li>Open Source</li>
          <li>Privacy</li>
          <li>No annoying ads and trackers</li>
        </ol>
        <div className={styles.home__source_code}>
          See the source code at{" "}
          <a href="https://www.github.com/aayushmau5/odin-book">Github</a>{" "}
          <FaGithub className={styles.home__github_icon} />
        </div>
      </motion.div>
      <FormContainer>
        <AnimatePresence exitBeforeEnter>
          {loginActive ? (
            <LoginForm toggleActive={toggleLoginActive} key="login" />
          ) : (
            <SignupForm toggleActive={toggleLoginActive} key="signup" />
          )}
        </AnimatePresence>
      </FormContainer>
    </div>
  );
}
