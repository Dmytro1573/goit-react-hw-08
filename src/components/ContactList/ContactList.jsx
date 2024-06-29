import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactsList}>
      {filteredContacts.map((contact) => (
        <li key={contact.id} className={css.contactItem}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
