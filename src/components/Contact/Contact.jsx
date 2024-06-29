import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

export default function Contact({ contact: { name, number, id } }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <div className={css.contactContainer}>
      <div className={css.dataContainer}>
        <div className={css.stringContainer}>
          <FaUser size={20} />
          <p className={css.contactName}>{name}</p>
        </div>
        <div className={css.stringContainer}>
          <FaPhone size={20} />
          <p className={css.contactNumber}>{number}</p>
        </div>
      </div>
      <button className={css.buttonDelete} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
