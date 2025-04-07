import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userType: localStorage.getItem("userType") || null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userType = action.payload.accountType;
      localStorage.setItem("userType", action.payload.accountType);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;