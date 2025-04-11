const express=require("express");
const { auth, isInstructor, isAdmin } = require("../middleware/auth");
const courseRoutes=express.Router();
const adminController=require("../controllers/Admin")
const instructorController=require("../controllers/Instructor");
const { getCourseDetails } = require("../controllers/Course");

courseRoutes.post("/createcategory",auth,isAdmin,adminController.postCategory)
courseRoutes.get("/showAllCategory",adminController.showAllCategory)

courseRoutes.post("/createcourse",auth,isInstructor,instructorController.postCourse);
courseRoutes.delete("/deleteCourse",auth,isInstructor,instructorController.deleteCourse)
courseRoutes.put("/updateCourse/:courseId",auth,isInstructor,instructorController.updateCourse)
courseRoutes.post("/createCourseSection",auth,isInstructor,instructorController.postCourseSection); 
courseRoutes.post("/createCourseSubSection",auth,isInstructor,instructorController.postCourseSubSection); 
courseRoutes.put("/updateSection",auth,isInstructor,instructorController.updateSection);
courseRoutes.delete("/deleteSection",auth,isInstructor,instructorController.deleteSection)
courseRoutes.put("/updateSubSection",auth,isInstructor,instructorController.updateSubSection)
courseRoutes.delete("/deleteSubSection",auth,isInstructor,instructorController.deleteSubSection)
courseRoutes.get("/getCourseDetails/:courseId",getCourseDetails);
courseRoutes.get("/showAllCategory",adminController.showAllCategory)
courseRoutes.get("/getEnrolledCourse",auth,instructorController.getEnrolledCourse);


courseRoutes.get("/getUserCart",auth,instructorController.getUserCart);
courseRoutes.post("/addToCart",auth,instructorController.addToCart);
courseRoutes.delete("/deleteUserCart",auth,instructorController.deleteUserCart);

courseRoutes.get("/getCreatedCourse",auth,isInstructor,instructorController.getCreatedCourse);


module.exports=courseRoutes;