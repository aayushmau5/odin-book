import { Field, Form, Formik } from "formik";
import { FaSearch } from "react-icons/fa";

import styles from "../../styles/DesktopNav.module.scss";

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
    <div className={styles.searchBar}>
      <FaSearch />
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
