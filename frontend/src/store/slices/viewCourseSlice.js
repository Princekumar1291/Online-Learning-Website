import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  videoUrl: null,
  loading: false,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVideoUrl:(state,action)=>{
      state.videoUrl = action.payload
    }
  },
});

export const { setCourse, setLoading ,setVideoUrl} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;