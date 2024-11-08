import { createSlice } from "@reduxjs/toolkit";
import {
  getSubscription,
  getTraineeListing,
  userBlockUnblock,
  getTraineeDetail,
  getExerciseSubscription,
  getServiceProviderListing,
} from "./userListingApi";

export const userListingSlice = createSlice({
  name: "userListing",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceProviderListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getServiceProviderListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getServiceProviderListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getTraineeListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getTraineeListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getTraineeListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(userBlockUnblock.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(userBlockUnblock.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(userBlockUnblock.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getTraineeDetail.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getTraineeDetail.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getTraineeDetail.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getExerciseSubscription.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getExerciseSubscription.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getExerciseSubscription.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getSubscription.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSubscription.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default userListingSlice.reducer;
