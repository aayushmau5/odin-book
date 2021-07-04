import { ErrorMessage, Field, Form, Formik } from "formik";

import { Button, ErrorDiv, UserErrorDiv } from "../StyledComponents";
import formStyles from "@/styles/AuthForm.module.scss";

interface InputValues {
  firstName?: string;
  lastName?: string;
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

export default function ProfileSetup() {
  return (
    <Formik
      initialValues={{ firstName: "", lastname: "" }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form className={formStyles.form}>
          {isSubmitting ? <UserErrorDiv>Submission Error</UserErrorDiv> : null}
          <div className={formStyles.form__group}>
            <label className={formStyles.form__group__label}>
              Display Picture
            </label>
            <Field
              type="file"
              name="displayPicture"
              className={formStyles.form__group__input}
            />
          </div>
          <div className={formStyles.form__group}>
            <label
              htmlFor="firstname"
              className={formStyles.form__group__label}
            >
              Firstname
            </label>
            <Field
              type="text"
              name="firstname"
              id="firstname"
              className={formStyles.form__group__input}
            />
          </div>

          <div className={formStyles.from__group}>
            <label htmlFor="lastname" className={formStyles.form__group__label}>
              Lastname
            </label>
            <Field
              type="text"
              name="lastname"
              id="lastname"
              className={formStyles.form__group__input}
            />
            <ErrorMessage name="password" component={ErrorDiv} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}
