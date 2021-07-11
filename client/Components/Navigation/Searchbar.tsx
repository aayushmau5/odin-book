import { Field, Form, Formik } from "formik";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "@/styles/DesktopNav.module.scss";

function submitHandler(values, { setSubmitting }: { setSubmitting: Function }) {
  setTimeout(() => {
    if (values.searchQuery !== "") {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }
  }, 400);
}

export default function SearchBar() {
  return (
    <div className={`bm-item ${styles.searchBar}`}>
      <AiOutlineSearch />
      <Formik initialValues={{ searchQuery: "" }} onSubmit={submitHandler}>
        {({ isSubmitting }) => (
          <Form className={styles.searchBar__form}>
            <Field
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search Users"
              className={styles.searchBarInput}
              disabled={isSubmitting}
            ></Field>
          </Form>
        )}
      </Formik>
    </div>
  );
}
