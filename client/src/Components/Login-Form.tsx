import styles from "../styles/LoginForm.module.scss";
import { AuthForm } from "./AuthForm";
import { Button } from "./StyledComponents";

export default function LoginForm() {
  return (
    <div className={styles.form}>
      <h2 className={styles.form__header}>Login</h2>
      <AuthForm isLogin={true} />
      <Button>Login with Google</Button>
    </div>
  );
}
