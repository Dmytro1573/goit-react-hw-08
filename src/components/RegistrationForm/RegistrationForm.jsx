import { useId } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";

const addContactValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("The field is required"),
  email: Yup.string().email("Email format").required("The field is required"),
  password: Yup.string()
    .min(7, "Too short!")
    .max(50, "Too long!")
    .required("The field is required"),
});

export default function RegistrationForm() {
  const fieldID = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Your registration is successful!");
      })
      .catch((error) => {
        toast.error(
          "Registration failed. Probably, your email address has already been registered"
        );
        console.log(error);
      });
    actions.resetForm();
  };

  return (
    <div>
      <Toaster />
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={addContactValidation}
      >
        <Form className={css.formcontainer}>
          <label htmlFor={`${fieldID}-name`}>
            Username
            <Field
              className={css.forminput}
              type="text"
              name="name"
              id={`${fieldID}-name`}
            />
            <ErrorMessage
              className={css.attention}
              name="name"
              component="div"
            />
          </label>

          <label htmlFor={`${fieldID}-email`}>
            Email
            <Field
              className={css.forminput}
              type="email"
              name="email"
              id={`${fieldID}-email`}
            />
            <ErrorMessage
              className={css.attention}
              name="email"
              component="div"
            />
          </label>

          <label htmlFor={`${fieldID}-password`}>
            Password
            <Field
              className={css.forminput}
              type="password"
              name="password"
              id={`${fieldID}-password`}
            />
            <ErrorMessage
              className={css.attention}
              name="password"
              component="div"
            />
          </label>

          <button className={css.addButton} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
