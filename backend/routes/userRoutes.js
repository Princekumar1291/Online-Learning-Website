const express=require("express");
const { sendOtp, signUp, login, resetPassword, updatePassword } = require("../controllers/Auth");
const { auth } = require("../middleware/auth");
const userRoutes=express.Router();

userRoutes.post("/sendotp",sendOtp)
userRoutes.post("/signup",signUp)
userRoutes.post("/login",login)
userRoutes.post("/updatepassword",auth,updatePassword)
userRoutes.post("/resetpassword",resetPassword)


module.exports=userRoutes;