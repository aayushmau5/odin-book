import styles from "../styles/LoginForm.module.scss";
import { AuthForm } from "./AuthForm";
import { Button } from "./StyledComponents";

export default function LoginForm() {
  return (
    <div className={styles.form}>
      <h2 className={styles.form__header}>Login</h2>
      <AuthForm isLogin={true} />
      <h3 className={styles.form__separator}>OR</h3>
      <Button>Login with Google</Button>
      <p className={styles.form__signup_paragraph}>
        Don't have an account?{" "}
        <span className={styles.form__signup_link}>Signup &#8594;</span>
      </p>
    </div>
  );
}
