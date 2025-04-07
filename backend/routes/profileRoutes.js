const express=require("express")
const profileRoutes=express.Router();
const userController=require("../controllers/User");
const { auth } = require("../middleware/auth");


profileRoutes.post("/updateprofilepicture",auth,userController.updateProfilePicture)
profileRoutes.put("/updateadditionaldetails",auth,userController.updateAdditionalDetails)
profileRoutes.get("/getuserdetails",auth,userController.getUserDetails)


module.exports=profileRoutes;