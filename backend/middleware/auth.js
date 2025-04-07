const jwt=require("jsonwebtoken")
const User=require("../models/User")


//auth 
module.exports.auth=async (req,res,next)=>{
  try {
    //extract token
    const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;

    console.log("token",token)
    console.log(req.body)

    //if token is missing
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Please Authenticate"
      })
    }

    //verify the token
    try {
      const decode=jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode)
      req.user=decode
      
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:"Invalid Token"
      })
    }
    next();
    
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(401).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}




//student
module.exports.isStudent=async (req,res,next)=>{
  try {
    const accountType=req.user.accountType;
    if(accountType!=="Student"){
      return res.status(401).json({
        success:false,
        message:"This is protected route for students"
      })
    }
    next();
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User Role Not verified",
    })
  }
}


//instructor
module.exports.isInstructor=async (req,res,next)=>{
  try {
    const accountType=req.user.accountType;
    if(accountType!=="Instructor"){
      return res.status(401).json({
        success:false,
        message:"This is protected route for Instructor"
      })
    }
    next();
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User Role Not verified",
    })
  }
}




//admin

module.exports.isAdmin=async (req,res,next)=>{
  try {
    const accountType=req.user.accountType;
    if(accountType!=="Admin"){
      return res.status(401).json({
        success:false,
        message:"This is protected route for Admin"
      })
    }
    next();
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"User Role Not verified",
    })
  }
}