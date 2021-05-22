import styles from "../styles/LoginForm.module.scss";
import { Button } from "./Button";

export default function LoginForm() {
  return (
    <div className={styles.form}>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label>Email</label>
          <input />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
}
