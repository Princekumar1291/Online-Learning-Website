import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"

const initialState = {
    loading:false,
    token : Cookies.get("token") || ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state , action) => {
            console.log(action.payload)
            state.token = action.payload
            Cookies.set("token" , action.payload)
        },
        deleteToken: (state) => {
            state.token = ""
            Cookies.remove("token")
            localStorage.removeItem("user");
            localStorage.removeItem("userType");
        }
    } 
})

export const { setToken, deleteToken } =  authSlice.actions
export default authSlice.reducer