import { createSlice } from "@reduxjs/toolkit";
import { getWalletData, releasePayment } from "./walletApi";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getWalletData.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getWalletData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(releasePayment.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(releasePayment.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(releasePayment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default walletSlice.reducer;
