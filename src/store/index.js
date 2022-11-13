import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contactsSlice from "./contactsSlice";
import messageSlice from "./messageSlice";

const store = configureStore({
  reducer: { auth: authSlice, contacts: contactsSlice, message: messageSlice },
});

export default store;
