import { createSlice } from "@reduxjs/toolkit";
import {
  getStats,
  getServiceProviderProfile,
  getServiceProviderGuestMode,
} from "./guestApi";

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    error: null,
    loading: "idle",
    userCount: null,
    feedbacks: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceProviderGuestMode.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getServiceProviderGuestMode.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getServiceProviderGuestMode.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getServiceProviderProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getServiceProviderProfile.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getServiceProviderProfile.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getStats.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.userCount = {
          traineeCount: data?.trainee_count?.trainee_count,
          trainerCount: data?.trainer_count?.trainer_count,
          nutritionistCount: data?.nutritionist_count?.trainer_count,
        };
        state.feedbacks = data?.platform_reviews?.platform_reviews;
      });
  },
});

export default guestSlice.reducer;
