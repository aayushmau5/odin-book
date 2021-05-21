import { FaBook } from "react-icons/fa";

import styles from "./App.module.scss";
import { Button } from "./Components/Button";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.hero}>
        <FaBook className={styles.icon} />
        <header className={styles.header}>Odin Book</header>
        <h3 className={styles.sub_header}>
          Connect with your friends and families
        </h3>
        <h3 className={styles.sub_header}>Features:</h3>
        <ol>
          <li>Open Source</li>
          <li>Privacy</li>
          <li>No annoying ads and trackers</li>
        </ol>
      </div>
      <div className={styles.form}>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default App;
