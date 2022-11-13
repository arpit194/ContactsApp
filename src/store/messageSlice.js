import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  toId: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [...state.messages, payload];
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;
