import { ErrorMessage, Field, Form, Formik } from "formik";

import { AuthSchema } from "../utils/authInputValidation";
import { Button, ErrorDiv } from "./StyledComponents";
import styles from "../styles/AuthForm.module.scss";

interface InputValues {
  email?: string;
  password?: string;
}

interface Props {
  isLogin: boolean;
}

function submitHandler(
  values: InputValues,
  { setSubmitting }: { setSubmitting: Function }
) {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
}

export function AuthForm({ isLogin }: Props) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={AuthSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.form__group}>
            <label htmlFor="email" className={styles.form__group__label}>
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className={styles.form__group__input}
            />
            <ErrorMessage name="email" component={ErrorDiv} />
          </div>

          <div className={styles.from__group}>
            <label htmlFor="password" className={styles.form__group__label}>
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className={styles.form__group__input}
            />
            <ErrorMessage name="password" component={ErrorDiv} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isLogin ? "Login" : "Signup"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
