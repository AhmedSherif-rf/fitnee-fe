import { contactUs } from "./contactUsApi";
import { createSlice } from "@reduxjs/toolkit";

export const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactUs.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default contactUsSlice.reducer;
