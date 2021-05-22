import { FaBook, FaGithub } from "react-icons/fa";

import LoginForm from "../Components/Login-Form";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home__hero}>
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
      </div>
      <LoginForm />
    </div>
  );
}
