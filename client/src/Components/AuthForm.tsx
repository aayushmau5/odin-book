import { ErrorMessage, Field, Form, Formik } from "formik";

import { AuthSchema } from "../utils/authInputValidation";
import { Button, ErrorDiv, UserErrorDiv } from "./StyledComponents";
import formStyles from "../styles/AuthForm.module.scss";
import containerStyles from "../styles/LoginForm.module.scss";

interface InputValues {
  email?: string;
  password?: string;
}

interface Props {
  isLogin: boolean;
  toggleActive: () => void;
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

export function AuthForm({ isLogin, toggleActive }: Props) {
  return (
    <>
      <h2 className={containerStyles.form__header}>
        {isLogin ? "Login" : "Signup"}
      </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AuthSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className={formStyles.form}>
            {isSubmitting ? (
              <UserErrorDiv>Username or Password Incorrect</UserErrorDiv>
            ) : null}
            <div className={formStyles.form__group}>
              <label htmlFor="email" className={formStyles.form__group__label}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={formStyles.form__group__input}
              />
              <ErrorMessage name="email" component={ErrorDiv} />
            </div>

            <div className={formStyles.from__group}>
              <label
                htmlFor="password"
                className={formStyles.form__group__label}
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={formStyles.form__group__input}
              />
              <ErrorMessage name="password" component={ErrorDiv} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isLogin ? "Login" : "Signup"}
            </Button>
          </Form>
        )}
      </Formik>
      <h3 className={containerStyles.form__separator}>OR</h3>
      <Button>{isLogin ? "Login" : "Signup"} with Google</Button>
      {isLogin ? (
        <p className={containerStyles.form__signup_paragraph}>
          Don't have an account?{" "}
          <button
            className={containerStyles.form__signup_link}
            onClick={toggleActive}
          >
            Signup &#8594;
          </button>
        </p>
      ) : (
        <p className={containerStyles.form__signup_paragraph}>
          <button
            className={containerStyles.form__signup_link}
            onClick={toggleActive}
          >
            &#8592; Login,
          </button>
          if you already have an account
        </p>
      )}
    </>
  );
}
