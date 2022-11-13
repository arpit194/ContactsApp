import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("contacts-user")
    ? JSON.parse(localStorage.getItem("contacts-user"))
    : null,
  token: localStorage.getItem("contacts-token")
    ? JSON.stringify(localStorage.getItem("contacts-token"))
    : null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = JSON.stringify(payload.token);
      localStorage.setItem("contacts-user", JSON.stringify(payload.user));
      localStorage.setItem("contacts-token", payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("contacts-user");
      localStorage.removeItem("contacts-token");
    },
    setUser(state, { payload }) {
      state.user = payload;
      localStorage.setItem("contacts-user", JSON.stringify(payload));
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
