import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTickets } from "../../services";

export const getTicketData = createAsyncThunk(
  "api/getTicketData",
  async () => {
    return await getTickets();
  }
);

export const ticketSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicketData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTicketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
  },
});

export const selectData = (state) => state.ticket.data;
export const selectLoading = (state) => state.ticket.loading;
export const selectError = (state) => state.ticket.error;

export default ticketSlice.reducer;
