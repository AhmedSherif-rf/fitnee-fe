import { createSlice } from "@reduxjs/toolkit";
import {
  getReportsListing,
  getPlatformFeedbackListing,
  updatePlatformFeedbackStatus,
  getServiceProviderFeedbackListing,
  updateServiceProviderFeedbackStatus,
} from "./FeedbackApi";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlatformFeedbackListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPlatformFeedbackListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getPlatformFeedbackListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(updatePlatformFeedbackStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updatePlatformFeedbackStatus.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(updatePlatformFeedbackStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getServiceProviderFeedbackListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getServiceProviderFeedbackListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getServiceProviderFeedbackListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(updateServiceProviderFeedbackStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateServiceProviderFeedbackStatus.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(
        updateServiceProviderFeedbackStatus.rejected,
        (state, action) => {
          state.loading = "failed";
          state.error = action.payload.error;
        }
      )
      .addCase(getReportsListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getReportsListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getReportsListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default feedbackSlice.reducer;
