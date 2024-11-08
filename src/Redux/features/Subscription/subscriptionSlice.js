import { createSlice } from "@reduxjs/toolkit";
import {
  getCheckoutId,
  applyPromoCode,
  getWalletAmount,
  checkPaymentStatus,
} from "./subscriptionApi";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    entity: "",
    error: null,
    success: null,
    loading: "idle",
    checkoutId: null,
    subscriptionPlan: "",
    serviceProvider: null,
  },
  reducers: {
    setSubscriptionPlan: (state, action) => {
      state.entity = "";
      state.checkoutId = "";
      state.subscriptionPlan = action.payload;
    },
    setServiceProvider: (state, action) => {
      state.serviceProvider = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckoutId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCheckoutId.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.checkoutId = action.payload.id;
        state.entity = action.payload.entity;
        state.success = true;
      })
      .addCase(getCheckoutId.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(checkPaymentStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.checkoutId = "";
        state.entity = "";
        state.success = true;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.checkoutId = "";
        state.entity = "";
        state.error = action.payload.error;
      })
      .addCase(applyPromoCode.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(applyPromoCode.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(applyPromoCode.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getWalletAmount.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getWalletAmount.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getWalletAmount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export const {
  setSubscriptionPlan,
  setServiceProvider,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
