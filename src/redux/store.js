// store.js
import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "./slices/ticketSlice";

const store = configureStore({
  reducer: {
    ticket: ticketSlice,
  },
});

export default store;
