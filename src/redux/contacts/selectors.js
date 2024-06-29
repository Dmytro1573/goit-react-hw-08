import { selectNameFilter } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => {
  return state.contacts.items;
};
export const selectError = (state) => {
  return state.contacts.error;
};
export const selectLoading = (state) => {
  return state.contacts.loading;
};

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
