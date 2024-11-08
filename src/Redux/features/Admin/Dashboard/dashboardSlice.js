import { createSlice } from "@reduxjs/toolkit";
import { getUserStat, getCategoryWiseGraphData } from "./dashboardApi";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserStat.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getUserStat.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getUserStat.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(getCategoryWiseGraphData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCategoryWiseGraphData.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getCategoryWiseGraphData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default dashboardSlice.reducer;
