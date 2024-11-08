import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  resendOtp,
  verifyOtp,
  newPassword,
} from "./forgotPasswordApi";

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
    phone_number: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.success = true;
        state.loading = "succeeded";
        state.phone_number = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(newPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.phone_number = "";
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default forgotPasswordSlice.reducer;
