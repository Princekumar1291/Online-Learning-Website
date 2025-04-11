import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course:[],
  courseId: null,
  courseSubsection:[],
  editCourse: false,
  paymentLoading: false
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourses: (state, action) => {
      state.course = action.payload;
    },
    deleteCourse: (state, action) => {
      state.course = state.course.filter((course) => course._id !== action.payload);
    },
    setCoursesid: (state, action) => {
      state.courseId = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.editCourse = action.payload;
    },
    setCoursesSection:(state,action)=>{
      state.courseSubsection = [...state.courseSubsection, action.payload];
    },
    updateCourseSection: (state, action) => {
      state.courseSubsection=action.payload
    },
    setLectureInSubsection: (state, action) => {
      state.courseSubsection.forEach((sec) => {
        if (sec._id === action.payload.sectionId) {
          // if (!Array.isArray(sec.subsection)) {
          //   sec.subsection = [];
          // }
          sec.subSection.push(action.payload.newSubsection);
        }
      });
    },  
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

export const { setStep, setCourses, setEditCourse, setPaymentLoading, resetCourseState, setCoursesid,setCoursesSection,setLectureInSubsection,deleteCourse,updateCourseSection } = stepSlice.actions;

export default stepSlice.reducer;