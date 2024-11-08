import { createSlice } from "@reduxjs/toolkit";
import {
  editSubscriptionPlan,
  createSubscriptionPlan,
  getTraineeSubscriptionPlans,
  getExerciseSubscriptionPlans,
  getGuestServiceProviderSubscriptionPlans,
} from "./subscriptionPlanApi";

export const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscriptionPlan.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createSubscriptionPlan.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getTraineeSubscriptionPlans.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getTraineeSubscriptionPlans.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getTraineeSubscriptionPlans.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getGuestServiceProviderSubscriptionPlans.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getGuestServiceProviderSubscriptionPlans.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(
        getGuestServiceProviderSubscriptionPlans.rejected,
        (state, action) => {
          state.loading = "failed";
          state.error = action.payload.error;
        }
      )
      .addCase(editSubscriptionPlan.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(editSubscriptionPlan.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(editSubscriptionPlan.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getExerciseSubscriptionPlans.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getExerciseSubscriptionPlans.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getExerciseSubscriptionPlans.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default subscriptionPlanSlice.reducer;
