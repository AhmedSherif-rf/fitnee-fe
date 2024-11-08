import { createSlice } from "@reduxjs/toolkit";
import {
  addExercise,
  addCategory,
  getAllCategory,
  updateCategory,
  addSubCategory,
  getAllSubCategory,
  updateSubCategory,
  getExercisesForGuest,
  getAllCategoryForGuest,
} from "./exerciseApi";

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    error: null,
    success: null,
    loading: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(getAllSubCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllSubCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getAllSubCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(addSubCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addSubCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateSubCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(addExercise.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addExercise.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(getAllCategoryForGuest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllCategoryForGuest.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getAllCategoryForGuest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      })
      .addCase(getExercisesForGuest.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getExercisesForGuest.fulfilled, (state) => {
        state.loading = "succeeded";
        state.success = true;
      })
      .addCase(getExercisesForGuest.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.error;
      });
  },
});

export default exerciseSlice.reducer;
