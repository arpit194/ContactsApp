import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setContacts(state, { payload }) {
      state.contacts = payload;
    },
    addContact(state, { payload }) {
      state.contacts = [...state.contacts, payload];
    },
    removeContact(state, { payload }) {
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== payload
      );
    },
  },
});

export const contactsActions = contactsSlice.actions;
export default contactsSlice.reducer;
