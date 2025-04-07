import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cartItems.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        toast.error("Item already in cart")
        return;
      }
      state.cartItems.push(action.payload)
    },
    removeCourse: (state, action) => {
      console.log("Inside remove course", action.payload.courseId)
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload.courseId)
    },
    setCart: (state, action) => {
      state.cartItems = action.payload
    } 
  }
})


export const { setTotalItems, addToCart, removeCourse, setCart } = cartSlice.actions
export default cartSlice.reducer