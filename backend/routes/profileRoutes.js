const express=require("express")
const profileRoutes=express.Router();
const userController=require("../controllers/User");
const { auth, isInstructor } = require("../middleware/auth");
const { instructorDashboard } = require("../controllers/Instructor");


profileRoutes.post("/updateprofilepicture",auth,userController.updateProfilePicture)
profileRoutes.put("/updateadditionaldetails",auth,userController.updateAdditionalDetails)
profileRoutes.get("/getuserdetails",auth,userController.getUserDetails)

profileRoutes.get("/instructorDashboard",auth,isInstructor,instructorDashboard)

module.exports=profileRoutes;