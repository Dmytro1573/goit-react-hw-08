import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";

const addContactValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("The field is required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Please enter valid number: xxx-xx-xx.")
    .required("The field is required"),
});

export default function ContactForm() {
  const fieldID = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={addContactValidation}
    >
      <Form className={css.formcontainer}>
        <label htmlFor={`${fieldID}-name`}>
          Name
          <Field
            className={css.forminput}
            type="text"
            name="name"
            id={`${fieldID}-name`}
          />
          <ErrorMessage className={css.attention} name="name" component="div" />
        </label>

        <label htmlFor={`${fieldID}-number`}>
          Number
          <Field
            className={css.forminput}
            type="tel"
            name="number"
            id={`${fieldID}-number`}
          />
          <ErrorMessage
            className={css.attention}
            name="number"
            component="div"
          />
        </label>

        <button className={css.addButton} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
