import { ErrorMessage, Field, Form, Formik } from "formik";

import { AuthSchema } from "../../utils/authInputValidation";
import formStyles from "../../styles/AuthForm.module.scss";
import { Button, ErrorDiv, UserErrorDiv } from "../StyledComponents";

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

export default function AuthFormikForm({ isLogin }: Props) {
  return (
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
            <label htmlFor="password" className={formStyles.form__group__label}>
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
  );
}
