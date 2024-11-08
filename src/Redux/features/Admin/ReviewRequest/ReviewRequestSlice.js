import { createSlice } from "@reduxjs/toolkit";
import {
  getReviewRequestListing,
  approveReviewRequest,
  rejectReviewRequest,
  getServiceProviderDetail,
} from "./ReviewRequestApi";

export const reviewRequestSlice = createSlice({
  name: "reviewRequest",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewRequestListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getReviewRequestListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getReviewRequestListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(approveReviewRequest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(approveReviewRequest.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(approveReviewRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(rejectReviewRequest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(rejectReviewRequest.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(rejectReviewRequest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getServiceProviderDetail.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getServiceProviderDetail.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getServiceProviderDetail.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default reviewRequestSlice.reducer;
