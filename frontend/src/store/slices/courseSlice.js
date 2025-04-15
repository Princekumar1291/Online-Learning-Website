import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  }
});

export default courseSlice.reducer;

export const { setCourses } = courseSlice.actions;