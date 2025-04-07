import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  courses: [
    {
      id: 1,
      title: "Learn HTML",
      category: "Web Development",
      image: "https://res.cloudinary.com/du6squ4z0/image/upload/v1741923728/CodeBoost/coursesThumbnailImage/sikd2it8cisxp5g8ijln.jpg",
      price: 0,
      rating: 4.5,
      lessons: 6,
    },
    {
      id: 2,
      title: "Learn CSS",
      category: "Web Development",
      image: "https://res.cloudinary.com/du6squ4z0/image/upload/v1741923728/CodeBoost/coursesThumbnailImage/sikd2it8cisxp5g8ijln.jpg",
      price: 0,
      rating: 4.5,
      lessons: 6,
    },
  ],
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